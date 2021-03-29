
import { getCustomRepository } from "typeorm";
import AppError from '@shared/errors/AppError';
import UsersRepository from "../typeorm/repositories/UsersRepository";
import UserTokensRepository from "../typeorm/repositories/UserTokensRepository";
import EtherealMail from '@config/mail/EtherealMail';
import path from 'path';

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

    const {token} = await userTokenRepository.generate(user.id);

    const forgotPasswordTemplate = path.resolve(__dirname, '..', 'views', 'forgot_password.hbs');
    // console.log(token);
    await EtherealMail.sendMail({
      to: {
        name: user.name,
        email: user.email,
      },
      subject: '[API Vendas] Recuperacao de senha',
      templateData: {
        file: forgotPasswordTemplate,
        variables: {
          name: user.name,
          link: `http://localhost:4200/reset_password?token=${token}`,
        },
      },
    });
  }
}

export default SendForgotPasswordEmailService;
