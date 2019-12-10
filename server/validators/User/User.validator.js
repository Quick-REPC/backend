const BaseJoi = require('joi');
import { ErrorTypes } from '../../errors';

const Joi = BaseJoi.extend(require('joi-phone-number'));

module.exports.GetUser = {
  options: ErrorTypes.MISSING_USER_CREDENTIALS,
  body: Joi.object({
    id: Joi.string(),
    email: Joi.string().email(),
  }).or('id', 'email'),
};

module.exports.AuthenticateUser = {
  options: ErrorTypes.MISSING_USER_CREDENTIALS,
  body: Joi.object({
    phone: Joi.string().phoneNumber({ defaultCountry: 'US', format: 'e164' }),
    email: Joi.string().email(),
    password: Joi.string().required(),
  }).or('phone', 'email'),
};

module.exports.CreateUser = {
  options: ErrorTypes.MISSING_USER_CREDENTIALS,
  body: Joi.object({
    email: Joi.string()
      .email()
      .required(),
    firstName: Joi.string().required(),
    lastName: Joi.string().required(),
    phone: Joi.string().phoneNumber({ defaultCountry: 'US', format: 'e164' }),
    password: Joi.string().required(),
  }),
};
