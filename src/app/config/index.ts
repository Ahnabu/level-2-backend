import dotenv from 'dotenv';
import path from 'path';
dotenv.config({ path: path.join(process.cwd(), '.env') });

export default {
  port: process.env.PORT || 5000,
  dbUrl: process.env.DB_URL || 'mongodb://localhost:27017/test',
};