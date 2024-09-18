// config/aiConfig.js
import OpenAI from 'openai';
import dotenv from 'dotenv';

// Load environment variables from .env file
dotenv.config();

const configuration = new OpenAI({
    apiKey: process.env.OPENAI_API_KEY,
});

const openai = configuration;

export default openai;