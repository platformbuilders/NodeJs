
import { getCustomRepository } from "typeorm";
import {isAfter, addHours} from 'date-fns';
import { UsersRepository } from '../typeorm/repositories/UsersRepository';
import { hash } from 'bcryptjs';
import AppError from '@shared/errors/AppError';
import UserTokensRepository from "../typeorm/repositories/UserTokensRepository";
import { injectable, inject } from 'tsyringe';
interface IRequest {
  token: string;
  password: string;
}
@injectable()
class ResetPasswordService {
  constructor(
    @inject('UsersRepository')
    @inject('UserTokensRepository')
    private userRepository: UsersRepository,
    private userTokenRepository: UserTokensRepository
    )
    {};

  public async execute({token, password}: IRequest): Promise<void> {


    const userToken = await this.userTokenRepository.findByToken(token);

    if(!userToken) {
      throw new AppError('User Token does not exist.');
    }

    const user = await this.userRepository.findOne(userToken.user_id);


    if(!user) {
      throw new AppError('User  does not exist.');
    }

    const tokenCreatedAt = userToken.created_at;
    const compareDate = addHours(tokenCreatedAt, 2);

    if (isAfter(Date.now(), compareDate)) {
      throw new AppError('Token Expired.');
    }

    user.password = await hash(password, 8);
    await this.userRepository.save(user);

  }
}

export default ResetPasswordService;
