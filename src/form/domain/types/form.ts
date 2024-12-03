import { IBaseModel } from '@nodesandbox/repo-framework';
import { Document } from 'mongoose';

export interface IForm {
  title: string;
  label: string;
  slug: string;
  description: string;
  components: Array<Record<string, any>>;
  group: string;
  display: string;
  version: number;
}

export interface IFormModel extends IForm, IBaseModel, Document {}
