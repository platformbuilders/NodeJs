
import { getCustomRepository } from "typeorm";
import AppError from '@shared/errors/AppError';
import { UsersRepository } from '../typeorm/repositories/UsersRepository';
import UserTokensRepository from "../typeorm/repositories/UserTokensRepository";
import EtherealMail from '@config/mail/EtherealMail';
import path from 'path';
import { injectable, inject } from 'tsyringe';

interface IRequest {
  email: string;
}
@injectable()
class SendForgotPasswordEmailService {
  constructor(
    @inject('UsersRepository')
    @inject('UserTokensRepository')
    private userRepository: UsersRepository,
    private UserTokensRepository: UserTokensRepository
    ) {};

  public async execute({email}: IRequest): Promise<void> {


    const user = await this.userRepository.findbyEmail(email);

    if(!user) {
      throw new AppError('User does not exist.');
    }

    const {token} = await this.UserTokensRepository.generate(user.id);

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
          link: `${process.env.APP_WEB_URL}/reset_password?token=${token}`,
        },
      },
    });
  }
}

export default SendForgotPasswordEmailService;
