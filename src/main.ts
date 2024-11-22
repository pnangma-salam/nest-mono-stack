import { NestFactory } from '@nestjs/core';
import { NestExpressApplication } from '@nestjs/platform-express';
import { ConfigService } from '@nestjs/config';
import { ValidationPipe } from '@nestjs/common';
import { AppModule } from './app.module';
import { ViewService } from './infrastructure/view/view.service';

async function bootstrap() {
  const app = await NestFactory.create<NestExpressApplication>(AppModule);

  const configService = app.get(ConfigService);
  const viewService = app.get(ViewService);

  app.useGlobalPipes(new ValidationPipe());

  viewService.setupViewEngine(app);

  const port = configService.get('app.port');
  await app.listen(port);

  console.log(`Application is running on: ${port}`);
}

bootstrap();
