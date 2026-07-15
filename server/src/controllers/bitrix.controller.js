import { getDeal, findRecurringByBaseId, addRecurringDeal } from '../services/bitrix24.service.js';

// Сценарий автопродления лицензий.
const PRIMARY_SALE_CATEGORY_ID = '30'; // воронка «Первичная продажа лицензии»
const PRIMARY_SALE_WON_STAGE = 'C30:WON';
const RENEWAL_CATEGORY_ID = 32; // воронка «Продление лицензии»
const LEAD_DAYS = 15; // за сколько дней до конца лицензии заводить продление
// Пользовательское поле сделки с датой окончания лицензии (напр. UF_CRM_LICENSE_END).
const LICENSE_END_FIELD = process.env.BITRIX24_LICENSE_END_FIELD;

/**
 * START_DATE первой сделки-продления: дата окончания лицензии − срок предупреждения.
 * Дальше повторная сделка идёт ежемесячно, каждый раз за LEAD_DAYS до конца периода.
 */
const computeStartDate = (licenseEnd) => {
  const base = new Date(licenseEnd);
  base.setDate(base.getDate() - LEAD_DAYS);
  return base.toISOString().slice(0, 10); // YYYY-MM-DD
};

/**
 * POST /api/integrations/bitrix/deal-event
 * Обработчик события onCrmDealUpdate (привязан через event.bind).
 * При переходе первичной продажи лицензии в «успех» заводит шаблон повторной сделки.
 * Аутентификация — секрет в query (?s=...), задаётся при event.bind.
 * Всегда отвечает 200 (кроме неверного секрета) — Bitrix не должен ретраить.
 */
export const handleDealEvent = async (req, res) => {
  const secret = process.env.BITRIX24_EVENT_TOKEN;
  if (secret && req.query.s !== secret) {
    return res.status(403).json({ ok: false });
  }

  try {
    const event = req.body?.event;
    const dealId = req.body?.data?.FIELDS?.ID;
    console.info('[Bitrix event] получено', { event, dealId });

    if (!dealId) return res.status(200).json({ ok: true });

    const deal = await getDeal(dealId);
    if (!deal) return res.status(200).json({ ok: true });

    // Реагируем только на успешную первичную продажу лицензии.
    if (
      String(deal.CATEGORY_ID) !== PRIMARY_SALE_CATEGORY_ID ||
      deal.STAGE_ID !== PRIMARY_SALE_WON_STAGE
    ) {
      return res.status(200).json({ ok: true });
    }

    // Дата окончания лицензии обязательна — иначе не знаем, когда продлевать.
    // Менеджер мог закрыть сделку с опозданием, поэтому опираемся на неё, а не на CLOSEDATE.
    const licenseEnd = LICENSE_END_FIELD ? deal[LICENSE_END_FIELD] : null;
    if (!licenseEnd) {
      console.info(
        '[Bitrix event] у сделки',
        dealId,
        'не заполнена дата окончания лицензии — шаблон не создаётся'
      );
      return res.status(200).json({ ok: true, skipped: 'no_license_end' });
    }

    // Идемпотентность: не заводим второй шаблон на ту же сделку.
    const existing = await findRecurringByBaseId(dealId);
    if (existing) {
      console.info('[Bitrix event] шаблон уже существует для сделки', dealId, '— пропуск');
      return res.status(200).json({ ok: true });
    }

    const startDate = computeStartDate(licenseEnd);

    if (process.env.BITRIX24_EVENT_DRYRUN === '1') {
      console.info('[Bitrix event] DRYRUN: создал бы шаблон', {
        dealId,
        categoryId: RENEWAL_CATEGORY_ID,
        startDate,
      });
      return res.status(200).json({ ok: true, dryrun: true });
    }

    const recurringId = await addRecurringDeal({
      dealId,
      categoryId: RENEWAL_CATEGORY_ID,
      startDate,
    });
    console.info(
      '[Bitrix event] шаблон повторной сделки создан',
      recurringId,
      'для сделки',
      dealId,
      'START_DATE',
      startDate
    );
    return res.status(200).json({ ok: true, recurringId });
  } catch (err) {
    console.error('[Bitrix event] ошибка обработки:', err.message);
    return res.status(200).json({ ok: false });
  }
};
