import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { MongooseModule } from '@nestjs/mongoose';
import { AppConfig, ViewConfig } from './config';
import { HomeModule } from './features/home/home.module';
import { PostsModule } from './features/posts/posts.module';
import { FormModule } from './form/form.module';
import { ViewService } from './infrastructure/view/view.service';
import { ProcessModule } from './process/process.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      load: [AppConfig, ViewConfig],
    }),

    MongooseModule.forRootAsync({
      imports: [ConfigModule],
      useFactory: (configService: ConfigService) => ({
        uri: configService.get('app.mongoUri'),
      }),
      inject: [ConfigService],
    }),

    HomeModule,
    PostsModule,
    FormModule,
    ProcessModule,
  ],
  providers: [ViewService],
})
export class AppModule {}
