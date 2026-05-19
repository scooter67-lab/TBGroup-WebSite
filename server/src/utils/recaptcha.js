import axios from 'axios';

export const verifyRecaptcha = async (token) => {
  const secret = process.env.RECAPTCHA_SECRET_KEY;
  if (!secret) return true;

  if (!token) return false;

  try {
    const { data } = await axios.post(
      'https://www.google.com/recaptcha/api/siteverify',
      null,
      { params: { secret, response: token } }
    );
    return data.success === true;
  } catch {
    return false;
  }
};
