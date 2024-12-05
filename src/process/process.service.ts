import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { BaseService } from '@nodesandbox/repo-framework';
import { Model } from 'mongoose';
import { IProcessModel } from './domain';
import { ProcessRepository } from './repositories';

@Injectable()
export class ProcessService extends BaseService<
  IProcessModel,
  ProcessRepository
> {
  constructor(
    @InjectModel('Process') private readonly processModel: Model<IProcessModel>,
  ) {
    const processRepo = new ProcessRepository(processModel);
    super(processRepo);
  }
}
