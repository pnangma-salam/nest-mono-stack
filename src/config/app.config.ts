import { registerAs } from '@nestjs/config';
// import { MongooseModule } from '@nestjs/mongoose';

export default registerAs('app', () => ({
  port: parseInt(process.env.PORT, 10) || 3000,
  mongoUri: process.env.MONGO_URI || 'localhost',
  environment: process.env.NODE_ENV || 'development',
  name: process.env.APP_NAME || 'NestJS Mono Stack',
}));
