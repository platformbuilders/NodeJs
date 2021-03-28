
import { UsersRepository } from '../typeorm/repositories/UsersRepository';
import { getCustomRepository } from "typeorm";
import User from '../typeorm/entities/User';
import AppError from '@shared/errors/AppError';

interface IRequest {
  id: string;
  name: string;
  email: string;
  password: string;
}

class UpdateUserService {
  public async execute({ id, name, email, password }: IRequest): Promise<User> {

    const userRepository = getCustomRepository(UsersRepository);

    const user = await userRepository.findOne(id);

    if(!user) {
      throw new AppError('Usuário não encontrado.');
    }

    const userExists = await userRepository.findbyEmail(email);

    if (userExists) {
      throw new AppError('Este email já foi cadastrado');
    }

    user.name = name;
    user.email = email;
    user.password = password;

    await userRepository.save(user);

    return user;
  }
}

export default UpdateUserService;
