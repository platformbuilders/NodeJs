
import { UserRepository } from './../typeorm/repositories/UsersRepository';
import { getCustomRepository } from "typeorm";
import User from '../typeorm/entities/User';
import AppError from '@shared/errors/AppError';

interface IRequest {
  name: string;
  email: string;
  password: string;
}

class CreateUserService {
  public async execute(data: IRequest): Promise<User> {
    // utilizando um repo customizado
    const userRepository = getCustomRepository(UserRepository);
    const userExists = await userRepository.findbyEmail(data.email);

    if (userExists) {
      throw new AppError('Este email já foi cadastrado');
    }

    const user = userRepository.create(data);
    await userRepository.save(user);

    return user;
  }
}

export default CreateUserService;
