import nodemailer from 'nodemailer';

const createTransporter = () => {
  if (!process.env.SMTP_HOST) return null;
  return nodemailer.createTransport({
    host: process.env.SMTP_HOST,
    port: parseInt(process.env.SMTP_PORT, 10) || 465,
    secure: process.env.SMTP_SECURE === 'true',
    auth: {
      user: process.env.SMTP_USER,
      pass: process.env.SMTP_PASS,
    },
  });
};

export const sendContactEmail = async (data) => {
  const transporter = createTransporter();
  if (!transporter) {
    console.log('SMTP not configured, skipping email');
    return;
  }

  const html = `
    <h2>Новая заявка с сайта TB Group</h2>
    <p><strong>Имя:</strong> ${data.name}</p>
    <p><strong>Email:</strong> ${data.email || '—'}</p>
    <p><strong>Телефон:</strong> ${data.phone || '—'}</p>
    <p><strong>Компания:</strong> ${data.company || '—'}</p>
    <p><strong>Услуга:</strong> ${data.service || '—'}</p>
    <p><strong>Сообщение:</strong></p>
    <p>${data.message || '—'}</p>
  `;

  await transporter.sendMail({
    from: process.env.MAIL_FROM || process.env.SMTP_USER,
    to: process.env.MAIL_TO || process.env.SMTP_USER,
    subject: `Заявка с сайта — ${data.name}`,
    html,
  });
};
