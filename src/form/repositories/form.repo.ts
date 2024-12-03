import { BaseRepository } from '@nodesandbox/repo-framework';
import { Model } from 'mongoose';
import { IFormModel } from '../domain';

export class FormRepository extends BaseRepository<IFormModel> {
  constructor(model: Model<IFormModel>) {
    super(model);
  }
}
