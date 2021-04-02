// Padrao Singleton
import RevExpRepository from '@modules/rev_exp/typeorm/repositories/RevExpRepository';
import TransactionsRepository from '@modules/transactions/typeorm/repositories/TransactionsRepository';
import UsersRepository from '@modules/users/typeorm/repositories/UsersRepository';
import UserTokensRepository from '@modules/users/typeorm/repositories/UserTokensRepository';
import {container} from 'tsyringe';


container.registerSingleton('UsersRepository', UsersRepository);
container.registerSingleton('UserTokensRepository', UserTokensRepository);
container.registerSingleton('RevExpRepository', RevExpRepository);
container.registerSingleton('TransactionsRepository', TransactionsRepository)

