import { Router } from 'express';
import { celebrate, Joi, Segments } from 'celebrate';
import RevExpController from '../controllers/RevExpController';

const revExpRouter = Router();
const revExpController = new RevExpController();

revExpRouter.post(
  '/',
  celebrate({
    [Segments.BODY]: Joi.object().keys({
      name: Joi.string().required(),
      description: Joi.string(),
      rev_exp_id: Joi.string().uuid()
    })
  }, {
    abortEarly: false
  }),
  revExpController.create
  );



export default revExpRouter;
