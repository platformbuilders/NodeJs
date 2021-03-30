
// Padrao Singleton

import UserTokensRepository from '@modules/users/typeorm/repositories/UserTokensRepository';
import {container} from 'tsyringe';
import { UsersRepository } from './../../modules/users/typeorm/repositories/UsersRepository';

container.registerSingleton('UsersRepository', UsersRepository);
container.registerSingleton('UserTokensRepository', UserTokensRepository);

