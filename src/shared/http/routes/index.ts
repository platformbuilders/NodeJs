import revExpRouter from '@modules/rev_exp/routes/revExp.routes';
import transactionsRouter from '@modules/transactions/routes/Transactions.routes';
import passwordRouter from '@modules/users/routes/password.routes';
import sessionsRouter from '@modules/users/routes/sessions.routes';
import usersRouter from '@modules/users/routes/users.routes';
import { Router } from 'express';

const routes = Router();

routes.use('/users', usersRouter);
routes.use('/sessions', sessionsRouter);
routes.use('/password', passwordRouter);
routes.use('/revexp', revExpRouter);
routes.use('/transactions', transactionsRouter);

export default routes;
