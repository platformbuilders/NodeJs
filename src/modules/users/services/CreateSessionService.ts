
import { UsersRepository } from './../typeorm/repositories/UsersRepository';
import User from '../typeorm/entities/User';
import AppError from '@shared/errors/AppError';
import { compare, hash } from 'bcryptjs';
import { sign } from 'jsonwebtoken';
import authConfig from '@config/auth';
import { injectable, inject } from 'tsyringe';


interface IRequest {
  email: string;
  password: string;
}

interface IResponse {
  user: User;
  token: string;
}

@injectable()
class CreateSessionService {
  constructor(
    @inject('UsersRepository')
    private userRepository: UsersRepository
    ) {};

  public async execute({email, password}: IRequest): Promise<IResponse> {

    const user = await this.userRepository.findbyEmail(email);

    if (!user) {
      throw new AppError('não autorizado.', 401);
    }

    const passwordConfirmed = await compare(password, user.password);

    if (!passwordConfirmed) {
      throw new AppError('Senha ou email incorreto.', 401);
    }

    let secret;
    if(authConfig.jwt.secret) secret = authConfig.jwt.secret;
    else secret = '';
    const token = sign({}, secret, {
      subject: user.id,
      expiresIn: authConfig.jwt.expiresIn,
    })

    return {
      user,
      token,
    };
  }
}

export default CreateSessionService;
