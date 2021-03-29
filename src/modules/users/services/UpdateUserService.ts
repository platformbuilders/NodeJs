
import { UsersRepository } from '../typeorm/repositories/UsersRepository';
import { getCustomRepository } from "typeorm";
import User from '../typeorm/entities/User';
import AppError from '@shared/errors/AppError';
import {compare, hash} from 'bcryptjs';

interface IRequest {
  id: string;
  name: string;
  email: string;
  password?: string;
  old_password?: string;
}

class UpdateUserService {
  public async execute({ id, name, email, password, old_password }: IRequest): Promise<User> {

    const userRepository = getCustomRepository(UsersRepository);

    const user = await userRepository.findOne(id);

    if(!user) {
      throw new AppError('Usuário não encontrado.');
    }

    const userExists = await userRepository.findbyEmail(email);

    if (userExists && userExists.id !== id) {
      throw new AppError('Este email já foi cadastrado');
    }

    if (password && !old_password) {
      throw new AppError('Password antigo é requerido.');
    }

    if(password && old_password) {
      const checkOldPassword = await compare(old_password, user.password);

      if (!checkOldPassword) {
        throw new AppError('Senha informada não correta.');
      }

      user.password = await hash(password, 8);
    }

    user.name = name;
    user.email = email;

    await userRepository.save(user);

    return user;
  }
}

export default UpdateUserService;
