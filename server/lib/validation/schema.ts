import Joi from 'joi';

export const Schema: { [key: string]: Joi.ObjectSchema<any> } = {
  event: Joi.object({}),
};
