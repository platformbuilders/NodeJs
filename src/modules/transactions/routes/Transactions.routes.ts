import { Router } from 'express';
import { celebrate, Joi, Segments } from 'celebrate';
import TransactionsController from '../controllers/TransactionsController';
import PaymentType from '../typeorm/entities/TransactionPaymentTypeEnum';
import PaymentStatus from '../typeorm/entities/TransactionPaymentStatusEnum';

const transactionsRouter = Router();
const transactionsController = new TransactionsController();

transactionsRouter.post(
  '/',
  celebrate({
    [Segments.BODY]: Joi.object().keys({
      description: Joi.string(),
      rev_exp_id: Joi.string().uuid().required(),
      user_id: Joi.string().uuid().required(),
      valor: Joi.number().required(),
      forma_pagamento: Joi.string().required().valid(PaymentType.cash, PaymentType.credit, PaymentType.debit),
      status_pagamento: Joi.string().required().valid(PaymentStatus.paid, PaymentStatus.unpaid, PaymentStatus.partial),
    })
  }, {
    abortEarly: false
  }),
  transactionsController.create
  );

export default transactionsRouter;
