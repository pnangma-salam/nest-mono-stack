import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { FORM_MODEL_NAME, formModel } from './domain';
import { FormController } from './form.controller';
import { FormService } from './form.service';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: FORM_MODEL_NAME, schema: formModel.schema },
    ]),
  ],
  controllers: [FormController],
  providers: [FormService],
})
export class FormModule {}
