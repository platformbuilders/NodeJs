import { Router } from 'express';
import { celebrate, Joi, Segments } from 'celebrate';
import CustomMessage from './CustomMessage';
import ForgotPasswordController from '../controllers/ForgotPasswordController';

const passwordRouter = Router();
const forgotPasswordController = new ForgotPasswordController();
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



export default passwordRouter;
