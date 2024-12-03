import { BaseModel, createBaseSchema } from '@nodesandbox/repo-framework';
import mongoose from 'mongoose';
import { IFormModel } from '../types';

export const FORM_MODEL_NAME = 'Form';

const formSchema = createBaseSchema<IFormModel>(
  {
    title: {
      type: String,
      required: true,
    },
    label: {
      type: String,
      required: true,
    },
    slug: {
      type: String,
      required: true,
    },
    description: {
      type: String,
      required: true,
    },
    components: {
      type: [mongoose.Schema.Types.Mixed],
      default: [],
    },
    group: {
      type: String,
    },
    version: {
      type: Number,
      required: true,
    },
  },
  {
    modelName: FORM_MODEL_NAME,
  },
);

const formModel = new BaseModel<IFormModel>(
  FORM_MODEL_NAME,
  formSchema,
).getModel();

export { formModel, formSchema };
