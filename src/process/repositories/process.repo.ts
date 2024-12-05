import { BaseRepository } from '@nodesandbox/repo-framework';
import { Model } from 'mongoose';
import { IProcessModel } from '../domain';

export class ProcessRepository extends BaseRepository<IProcessModel> {
  constructor(model: Model<IProcessModel>) {
    super(model);
  }
}
