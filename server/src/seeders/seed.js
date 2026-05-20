import User from '../models/User.js';
import Case from '../models/Case.js';
import Review from '../models/Review.js';
import Service from '../models/Service.js';
import Settings from '../models/Settings.js';
import Banner from '../models/Banner.js';
import { defaultPages } from '../data/defaultPages.js';

export const seedAdmin = async () => {
  const email = process.env.ADMIN_EMAIL || 'admin@tbgroup.ru';
  const exists = await User.findOne({ email });
  if (!exists) {
    await User.create({
      name: 'Administrator',
      email,
      password: process.env.ADMIN_PASSWORD || 'Admin123!',
      role: 'admin',
    });
    console.log(`Admin created: ${email}`);
  }
};

const servicesData = [
  {
    title: 'МойСклад',
    slug: 'moysklad',
    shortDescription: 'Внедрение, интеграции и автоматизация учёта',
    description:
      'Комплексное внедрение облачной системы МойСклад: настройка складского учёта, интеграция с CRM и маркетплейсами, автоматизация документооборота.',
    icon: 'package',
    order: 1,
    benefits: [
      { title: 'Быстрый старт', description: 'Запуск за 2–4 недели с обучением команды' },
      { title: 'Интеграции', description: 'Связка с Битрикс24, 1С, маркетплейсами' },
      { title: 'CRM-синхронизация', description: 'Единая база клиентов и заказов' },
      { title: 'Автоматизация', description: 'Роботы для резервов, отгрузок и уведомлений' },
    ],
    steps: [
      { title: 'Аудит', description: 'Анализ текущих процессов и требований' },
      { title: 'Настройка', description: 'Конфигурация МойСклад под ваш бизнес' },
      { title: 'Интеграция', description: 'Подключение внешних систем' },
      { title: 'Обучение', description: 'Обучение сотрудников и сопровождение' },
    ],
    faq: [
      {
        question: 'Сколько времени занимает внедрение?',
        answer: 'От 2 до 6 недель в зависимости от масштаба и количества интеграций.',
      },
      {
        question: 'Можно ли мигрировать данные из 1С?',
        answer: 'Да, выполняем миграцию номенклатуры, остатков и контрагентов.',
      },
    ],
    gallery: [],
  },
  {
    title: 'Битрикс24',
    slug: 'bitrix24',
    shortDescription: 'CRM, автоматизация и телефония в единой экосистеме',
    description:
      'Внедрение Битрикс24: CRM, воронки продаж, бизнес-процессы, роботы, интеграции и IP-телефония.',
    icon: 'users',
    order: 2,
    benefits: [
      { title: 'CRM', description: 'Управление лидами и сделками' },
      { title: 'Автоматизация', description: 'Бизнес-процессы и роботы' },
      { title: 'Телефония', description: 'SIP, запись звонков, аналитика' },
      { title: 'Интеграции', description: 'Связь с МойСклад, сайтом, мессенджерами' },
    ],
    steps: [
      { title: 'Проектирование', description: 'Схема воронок и ролей' },
      { title: 'Настройка CRM', description: 'Поля, стадии, права доступа' },
      { title: 'Автоматизация', description: 'Роботы, триггеры, уведомления' },
      { title: 'Запуск', description: 'Обучение и техподдержка' },
    ],
    faq: [
      {
        question: 'Облако или коробка?',
        answer: 'Работаем с облачной и коробочной версией Битрикс24.',
      },
    ],
    gallery: [],
  },
  {
    title: 'Телефония',
    slug: 'telephony',
    shortDescription: 'SIP, IP-АТС и интеграция с CRM',
    description:
      'Настройка IP-телефонии: SIP-транки, виртуальная АТС, интеграция с Битрикс24, call tracking и аналитика.',
    icon: 'phone',
    order: 3,
    benefits: [
      { title: 'SIP', description: 'Подключение номеров и транков' },
      { title: 'IP-АТС', description: 'Виртуальная АТС с IVR и очередями' },
      { title: 'CRM', description: 'Всплывающие карточки и запись звонков' },
      { title: 'Call tracking', description: 'Отслеживание источников звонков' },
    ],
    steps: [
      { title: 'Подбор решения', description: 'Выбор провайдера и тарифа' },
      { title: 'Настройка АТС', description: 'Маршрутизация, IVR, очереди' },
      { title: 'Интеграция CRM', description: 'Связь с Битрикс24' },
      { title: 'Тестирование', description: 'Проверка качества связи' },
    ],
    faq: [
      {
        question: 'Какие CRM поддерживаются?',
        answer: 'Прежде всего Битрикс24, также возможна интеграция с другими CRM через API.',
      },
    ],
    gallery: [],
  },
];

const casesData = [
  {
    title: 'Автоматизация склада для дистрибьютора',
    slug: 'distributor-warehouse',
    client: 'ООО «ТоргСнаб»',
    industry: 'Оптовая торговля',
    services: ['moysklad', 'bitrix24'],
    task: 'Разрозненный учёт в Excel, потери при отгрузках, отсутствие связи склада с отделом продаж.',
    solution:
      'Внедрили МойСклад с интеграцией в Битрикс24: автоматическое резервирование, синхронизация остатков, единая база клиентов.',
    result: 'Сократили время обработки заказа на 40%, исключили двойные продажи.',
    metrics: [
      { label: 'Сокращение времени', value: '40%' },
      { label: 'Интеграций', value: '5' },
      { label: 'Срок внедрения', value: '6 нед.' },
    ],
    featured: true,
    published: true,
    order: 1,
  },
  {
    title: 'CRM и телефония для B2B-компании',
    slug: 'b2b-crm-telephony',
    client: 'АО «ПромТех»',
    industry: 'Промышленность',
    services: ['bitrix24', 'telephony'],
    task: 'Менеджеры не фиксировали звонки, лиды терялись, не было аналитики по воронке.',
    solution:
      'Настроили Битрикс24 с SIP-телефонией, воронками, роботами напоминаний и дашбордами для руководства.',
    result: 'Конверсия лидов выросла на 28%, все звонки записываются в CRM.',
    metrics: [
      { label: 'Рост конверсии', value: '+28%' },
      { label: 'Менеджеров', value: '12' },
      { label: 'Звонков/мес', value: '800+' },
    ],
    featured: true,
    published: true,
    order: 2,
  },
  {
    title: 'Облачная миграция и интеграции',
    slug: 'cloud-migration',
    client: 'ИП Сидоров',
    industry: 'E-commerce',
    services: ['moysklad'],
    task: 'Переход с локальной 1С на облачный учёт с подключением Wildberries и Ozon.',
    solution: 'Миграция данных, настройка обмена с маркетплейсами, автоматизация отгрузок FBS.',
    result: 'Единый учёт по всем каналам продаж, актуальные остатки в реальном времени.',
    metrics: [
      { label: 'Каналов продаж', value: '4' },
      { label: 'SKU', value: '12 000' },
      { label: 'Ошибок отгрузки', value: '-95%' },
    ],
    featured: false,
    published: true,
    order: 3,
  },
];

const reviewsData = [
  {
    author: 'Алексей Петров',
    company: 'ООО «ТоргСнаб»',
    position: 'Директор',
    text: 'TB Group оперативно внедрили МойСклад и связали со складом. Рекомендуем как надёжного партнёра.',
    rating: 5,
    type: 'text',
    published: true,
    moderated: true,
    order: 1,
  },
  {
    author: 'Мария Иванова',
    company: 'АО «ПромТех»',
    position: 'Коммерческий директор',
    text: 'Профессиональная настройка Битрикс24 и телефонии. Видим результат уже в первый месяц.',
    rating: 5,
    type: 'text',
    published: true,
    moderated: true,
    order: 2,
  },
  {
    author: 'Дмитрий Козлов',
    company: 'E-commerce проект',
    position: 'Владелец',
    text: 'Помогли с миграцией в облако и интеграцией маркетплейсов. Всё работает стабильно.',
    rating: 5,
    type: 'text',
    published: true,
    moderated: true,
    order: 3,
  },
];

const settingsData = [
  {
    key: 'contacts',
    value: {
      phone: '+7 (495) 123-45-67',
      email: 'info@tbgroup.ru',
      address: 'г. Москва, ул. Примерная, д. 1',
      telegram: 'https://t.me/tbgroup',
      whatsapp: 'https://wa.me/74951234567',
      mapLat: 55.7558,
      mapLng: 37.6173,
    },
  },
  {
    key: 'stats',
    value: {
      projects: 150,
      clients: 80,
      years: 8,
      integrations: 300,
    },
  },
  {
    key: 'seo',
    value: {
      siteName: 'TB Group',
      defaultTitle: 'TB Group — облачные решения, МойСклад, Битрикс24',
      defaultDescription:
        'Внедрение и интеграция облачных решений: МойСклад, Битрикс24, IP-телефония и CRM.',
    },
  },
  {
    key: 'social',
    value: {
      vk: '',
      telegram: 'https://t.me/tbgroup',
    },
  },
  { key: 'pages', value: defaultPages },
];

export const runSeed = async () => {
  await seedAdmin();

  if ((await Service.countDocuments()) === 0) {
    await Service.insertMany(servicesData);
    console.log('Services seeded');
  }

  if ((await Case.countDocuments()) === 0) {
    await Case.insertMany(casesData);
    console.log('Cases seeded');
  }

  if ((await Review.countDocuments()) === 0) {
    await Review.insertMany(reviewsData);
    console.log('Reviews seeded');
  }

  for (const s of settingsData) {
    await Settings.findOneAndUpdate({ key: s.key }, { value: s.value }, { upsert: true });
  }
  console.log('Settings seeded');

  if ((await Banner.countDocuments()) === 0) {
    await Banner.create({
      title: 'Бесплатная консультация',
      subtitle: 'Оценим ваши процессы и предложим решение',
      placement: 'hero',
      active: true,
      order: 1,
    });
    console.log('Banners seeded');
  }

  console.log('Seed completed');
};

const isDirectRun = process.argv[1]?.includes('seed.js');
if (isDirectRun) {
  const { default: connectDB } = await import('../config/db.js');
  await connectDB();
  await runSeed();
  process.exit(0);
}
