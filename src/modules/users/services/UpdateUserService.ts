
import { UsersRepository } from '../typeorm/repositories/UsersRepository';
import User from '../typeorm/entities/User';
import AppError from '@shared/errors/AppError';
import {compare, hash} from 'bcryptjs';
import { injectable, inject } from 'tsyringe';
interface IRequest {
  id: string;
  name: string;
  email: string;
  password?: string;
  old_password?: string;
}
@injectable()
class UpdateUserService {
  constructor(
    @inject('UsersRepository')
    private userRepository: UsersRepository
    ) {};

  public async execute({ id, name, email, password, old_password }: IRequest): Promise<User> {


    const user = await this.userRepository.findOne(id);

    if(!user) {
      throw new AppError('Usuário não encontrado.');
    }

    const userExists = await this.userRepository.findbyEmail(email);

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

    await this.userRepository.save(user);

    return user;
  }
}

export default UpdateUserService;
