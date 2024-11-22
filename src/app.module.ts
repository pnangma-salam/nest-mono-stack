import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { HomeModule } from './features/home/home.module';
import { ViewService } from './infrastructure/view/view.service';
import { AppConfig, ViewConfig } from './config';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      load: [AppConfig, ViewConfig],
    }),
    HomeModule,
  ],
  providers: [ViewService],
})
export class AppModule {}
