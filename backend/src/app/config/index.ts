import dotenv from 'dotenv';
import path from 'path';
dotenv.config({ path: path.join(process.cwd(), '.env') });

export default {
  port: process.env.PORT || 5000,
  dbUrl: process.env.DB_URL || 'mongodb://localhost:27017/UMS',
  default_password: process.env.DEFAULT_USER_PASS || 'password',
  bcrypt_salt_rounds: process.env.BCRYPT_SALT_ROUNDS,
  jwt_access_secret: process.env.JWT_ACCESS_SECRET,
  jwt_access_expires_in: process.env.JWT_ACCESS_EXPIRES_IN,
  NODE_ENV: process.env.NODE_ENV || 'production',
  jwt_refresh_secret: process.env.JWT_REFRESH_SECRET,
  jwt_refresh_expires_in: process.env.JWT_REFRESH_EXPIRES_IN,
  reset_password_url: process.env.RESET_PASSWORD_URL || "ums-backend-gjb8.vercel.app/api/v1/auth/reset-password",
  nodemailer_mail: process.env.NODEMAILER_MAIL,
  nodemailer_pass: process.env.NODEMAILER_PASS,
  reset_password_ui_url:
    process.env.RESET_PASSWORD_UI_URL|| 'http://localhost:5173',
  cloudinary_cloud_name:
    process.env.CLOUDINARY_CLOUD_NAME,
  cloudinary_api_key: process.env.CLOUDINARY_API_KEY ,
  cloudinary_api_secret:
    process.env.CLOUDINARY_API_SECRET,
  super_admin_password:
    process.env.SUPER_ADMIN_PASS,
};
