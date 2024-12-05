import { IBaseModel } from '@nodesandbox/repo-framework';
import { Document } from 'mongoose';

export interface IProcess {
  title: string;
  description: string;
  workflow: any;
  group: any;
  status: string;
}

export interface IProcessModel extends IProcess, IBaseModel, Document {}
