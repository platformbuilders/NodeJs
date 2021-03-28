
import { UsersRepository } from './../typeorm/repositories/UsersRepository';
import { getCustomRepository } from "typeorm";
import User from '../typeorm/entities/User';
import AppError from '@shared/errors/AppError';
import { hash } from 'bcryptjs';

interface IRequest {
  name: string;
  email: string;
  password: string;
}

class CreateUserService {
  public async execute({name, email, password}: IRequest): Promise<User> {
    // utilizando um repo customizado
    const userRepository = getCustomRepository(UsersRepository);
    const userExists = await userRepository.findbyEmail(email);

    if (userExists) {
      throw new AppError('Este email já foi cadastrado');
    }

    const hashedPassword = await hash(password, 8);

    const user = userRepository.create({
      name,
      email,
      password: hashedPassword
    });

    await userRepository.save(user);

    return user;
  }
}

export default CreateUserService;
