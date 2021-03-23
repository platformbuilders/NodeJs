
import { UserRepository } from './../typeorm/repositories/UsersRepository';
import { getCustomRepository } from "typeorm";
import User from '../typeorm/entities/User';
import AppError from '@shared/errors/AppError';
import { compare, hash } from 'bcryptjs';
import { sign } from 'jsonwebtoken';
import authConfig from '@config/auth';

interface IRequest {
  email: string;
  password: string;
}

interface IResponse {
  user: User;
  token: string;
}

class CreateSessionService {
  public async execute({email, password}: IRequest): Promise<IResponse> {
    // utilizando um repo customizado
    const userRepository = getCustomRepository(UserRepository);
    const user = await userRepository.findbyEmail(email);

    if (!user) {
      throw new AppError('não autorizado.', 401);
    }

    const passwordConfirmed = await compare(password, user.password);

    if (!passwordConfirmed) {
      throw new AppError('Senha ou email incorreto.', 401);
    }

    const token = sign({}, authConfig.jwt.secret, {
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
