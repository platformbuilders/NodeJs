import { Router } from 'express';
import { celebrate, Joi, Segments } from 'celebrate';
import CustomMessage from './CustomMessage';
import ForgotPasswordController from '../controllers/ForgotPasswordController';
import ResetPasswordController from '../controllers/ResetPasswordController';

const passwordRouter = Router();
const forgotPasswordController = new ForgotPasswordController();
const resetPasswordController = new ResetPasswordController();
const customMessage = new CustomMessage();

passwordRouter.post(
  '/forgot',
  celebrate({
    [Segments.BODY]: Joi.object().keys({
      email: Joi.string().email().required()
    })
  }, {
    abortEarly: false,
    messages: customMessage.customPt()
  }),
  forgotPasswordController.create
);

passwordRouter.post(
  '/reset',
  celebrate({
    [Segments.BODY]: Joi.object().keys({
      token: Joi.string().uuid().required(),
      password: Joi.string().required(),
      password_confirmation: Joi.string().required().valid(Joi.ref('password')),
    })
  }, {
    abortEarly: false,
    messages: customMessage.customPt()
  }),
  resetPasswordController.create
);


export default passwordRouter;
