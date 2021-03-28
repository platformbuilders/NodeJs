
import { getCustomRepository } from "typeorm";
import AppError from '@shared/errors/AppError';
import UsersRepository from "../typeorm/repositories/UsersRepository";
import UserTokensRepository from "../typeorm/repositories/UserTokensRepository";

interface IRequest {
  email: string;
}

class SendForgotPasswordEmailService {
  public async execute({email}: IRequest): Promise<void> {
    // utilizando um repo customizado
    const userRepository = getCustomRepository(UsersRepository);
    const userTokenRepository = getCustomRepository(UserTokensRepository);

    const user = await userRepository.findbyEmail(email);

    if(!user) {
      throw new AppError('User does not exist.');
    }

    const token = await userTokenRepository.generate(user.id);


  }
}

export default SendForgotPasswordEmailService;
