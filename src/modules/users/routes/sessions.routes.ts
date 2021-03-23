import { Router } from 'express';
import { celebrate, Joi, Segments } from 'celebrate';
import CustomMessage from './CustomMessage';
import SessionsController from '../controllers/SessionsController';

const sessionsRouter = Router();
const sessionsController = new SessionsController();
const customMessage = new CustomMessage();

sessionsRouter.post(
  '/',
  celebrate({
    [Segments.BODY]: Joi.object().keys({
      email: Joi.string().email().required(),
      password: Joi.string().min(6)
    })
  }, {
    abortEarly: false,
    messages: customMessage.customPt()
  }),
  sessionsController.create
  );



export default sessionsRouter;
