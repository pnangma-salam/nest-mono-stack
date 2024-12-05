import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { PROCESS_MODEL_NAME, processModel } from './domain';
import { ProcessController } from './process.controller';
import { ProcessService } from './process.service';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: PROCESS_MODEL_NAME, schema: processModel.schema },
    ]),
  ],
  providers: [ProcessService],
  controllers: [ProcessController],
})
export class ProcessModule {}
