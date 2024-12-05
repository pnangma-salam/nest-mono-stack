import { BaseModel, createBaseSchema } from '@nodesandbox/repo-framework';
import { IProcessModel } from '../types';

export const PROCESS_MODEL_NAME = 'Process';

const processSchema = createBaseSchema<IProcessModel>(
  {
    title: {
      type: String,
      required: true,
    },
    description: {
      type: String,
      required: true,
    },
    workflow: {
      xml: { type: String },
      json: { type: String },
    },
    group: {
      type: String,
    },
    status: {
      type: String,
      enum: ['active', 'inactive'],
      default: 'inactive',
    },
  },
  {
    modelName: PROCESS_MODEL_NAME,
  },
);

const processModel = new BaseModel<IProcessModel>(
  PROCESS_MODEL_NAME,
  processSchema,
).getModel();

export { processModel, processSchema };
