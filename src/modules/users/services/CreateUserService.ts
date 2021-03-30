
import { UsersRepository } from './../typeorm/repositories/UsersRepository';
import User from '../typeorm/entities/User';
import AppError from '@shared/errors/AppError';
import { hash } from 'bcryptjs';
import { injectable, inject } from 'tsyringe';
interface IRequest {
  name: string;
  email: string;
  password: string;
}

@injectable()
class CreateUserService {
  constructor(
    @inject('UsersRepository')
    private userRepository: UsersRepository
    ) {};

  public async execute({name, email, password}: IRequest): Promise<User> {

    const userExists = await this.userRepository.findbyEmail(email);

    if (userExists) {
      throw new AppError('Este email já foi cadastrado');
    }

    const hashedPassword = await hash(password, 8);

    const user = {
      name,
      email,
      password: hashedPassword
    }

    return await this.userRepository.create(user as User);

  }
}

export default CreateUserService;
