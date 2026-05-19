import 'dotenv/config';
import mongoose from 'mongoose';
import User from '../models/User.js';

const email = (process.env.ADMIN_EMAIL || 'admin@tbgroup.ru').trim().toLowerCase();
const password = process.env.ADMIN_PASSWORD || 'Admin123!';
const uri = process.env.MONGODB_URI || 'mongodb://localhost:27017/tbgroup';

await mongoose.connect(uri);

let user = await User.findOne({ email });
if (!user) {
  user = await User.create({
    name: 'Administrator',
    email,
    password,
    role: 'admin',
  });
  console.log(`Admin created: ${email}`);
} else {
  user.password = password;
  await user.save();
  console.log(`Password reset for: ${email}`);
}

console.log(`Use password from ADMIN_PASSWORD in server/.env (default: Admin123!)`);
await mongoose.disconnect();
