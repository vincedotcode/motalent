import User from '../models/User.js';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import sgMail from '@sendgrid/mail';
import dotenv from 'dotenv';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

dotenv.config();
const jwtSecret = process.env.JWT_SECRET || 'g889f332';
const jwtExpiresIn = 86400;

sgMail.setApiKey(process.env.SENDGRID_API_KEY);

// Function to load and replace placeholders in the email template
const loadEmailTemplate = (filePath, replacements) => {
    let template = fs.readFileSync(filePath, { encoding: 'utf-8' });
    for (const key in replacements) {
      template = template.replace(new RegExp(`{{${key}}}`, 'g'), replacements[key]);
    }
    return template;
  };
  
  // Function to get the directory name equivalent to __dirname
  const __filename = fileURLToPath(import.meta.url);
  const __dirname = path.dirname(__filename);
  
  const sendVerificationEmail = async (user) => {
    const verificationToken = jwt.sign({
      id: user._id,
      email: user.email,
    }, jwtSecret, { expiresIn: '1h' });
  
    const verificationUrl = `${process.env.BASE_URL}/auth/verify?token=${verificationToken}`;
  
    const replacements = {
      action_url: verificationUrl,
    };
  
    const templatePath = path.join(__dirname, '../email/verify.html');
    const emailHtml = loadEmailTemplate(templatePath, replacements);
  
    const msg = {
      to: user.email,
      from: 'erkadoovince@gmail.com',
      subject: 'Verify Your Account',
      text: `Please verify your account by clicking the following link: ${verificationUrl}`,
      html: emailHtml,
    };
  
    await sgMail.send(msg);
  };

  const sendResetPasswordEmail = async (user) => {
    const resetToken = jwt.sign({
      id: user._id,
      email: user.email,
    }, jwtSecret, { expiresIn: '1h' });
  
    const resetUrl = `${process.env.BASE_URL}/auth/reset?token=${resetToken}`;
  
    const replacements = {
      action_url: resetUrl,
    };
  
    const templatePath = path.join(__dirname, '../email/reset.html');
    const emailHtml = loadEmailTemplate(templatePath, replacements);
  
    const msg = {
      to: user.email,
      from: 'erkadoovince@gmail.com',
      subject: 'Reset Your Password',
      text: `Please reset your password by clicking the following link: ${resetUrl}`,
      html: emailHtml,
    };
  
    await sgMail.send(msg);
  };
  

// Register
const register = async (userData) => {
  const userExists = await User.findOne({ email: userData.email });
  if (userExists) {
    throw new Error('Email already exists');
  }
  const hashedPassword = await bcrypt.hash(userData.password, 10);

  const user = new User({
    ...userData,
    password: hashedPassword,
    isVerified: false,
  });

  await user.save();

  try {
    await sendVerificationEmail(user);
  } catch (error) {
    console.log(error);
    await User.deleteOne({ _id: user._id });
    throw new Error('Failed to send verification email. Please try again.');
  }

  return { message: 'Account registered. Please verify your account. A verification email has been sent.' };
};

// Verify Account
const verifyAccount = async (token) => {
  let decoded;
  try {
    decoded = jwt.verify(token, jwtSecret);
  } catch (err) {
    throw new Error('Invalid or expired token');
  }

  const user = await User.findById(decoded.id);
  if (!user) {
    throw new Error('User not found');
  }

  if (user.isVerified) {
    throw new Error('User already verified');
  }

  user.isVerified = true;
  await user.save();

  return { message: 'Account verified successfully' };
};

// Login
const login = async (email, password) => {
  const user = await User.findOne({ email });
  if (!user) {
    throw new Error('User not found');
  }

  if (!user.isVerified) {
    await sendVerificationEmail(user);
    throw new Error('Account not verified. A verification email has been sent.');
  }

  const isMatch = await bcrypt.compare(password, user.password);
  if (!isMatch) {
    throw new Error('Invalid password');
  }

  const token = jwt.sign({
    id: user._id,
    email: user.email,
    role: user.role,
    name: user.firstName + ' ' + user.lastName,
  }, jwtSecret, { expiresIn: jwtExpiresIn });

  const userObject = user.toObject();
  delete userObject.password;

  return { user: userObject, token };
};

// Resend Verification Email
const resendVerificationEmail = async (email) => {
  const user = await User.findOne({ email });
  if (!user) {
    throw new Error('User not found');
  }

  if (user.isVerified) {
    throw new Error('User already verified');
  }

  await sendVerificationEmail(user);

  return { message: 'Verification email sent' };
};

// Get User By ID
const getUserById = async (userId) => {
  const user = await User.findById(userId);
  if (!user) {
    throw new Error('User not found');
  }

  const userObject = user.toObject();
  delete userObject.password;

  return userObject;
};

// Forgot Password
const forgotPassword = async (email) => {
  const user = await User.findOne({ email });
  if (!user) {
    throw new Error('User not found');
  }

  await sendResetPasswordEmail(user);

  return { message: 'Reset password email sent' };
};

// Reset Password
const resetPassword = async (token, newPassword) => {
  let decoded;
  try {
    decoded = jwt.verify(token, jwtSecret);
  } catch (err) {
    throw new Error('Invalid or expired token');
  }

  const user = await User.findById(decoded.id);
  if (!user) {
    throw new Error('User not found');
  }

  const hashedPassword = await bcrypt.hash(newPassword, 10);
  user.password = hashedPassword;
  await user.save();

  return { message: 'Password reset successfully' };
};

export default {
  register,
  verifyAccount,
  login,
  resendVerificationEmail,
  getUserById,
  forgotPassword,
  resetPassword,
};
