
import { UserRepository } from '../typeorm/repositories/UsersRepository';
import { getCustomRepository } from "typeorm";
import User from '../typeorm/entities/User';
import AppError from '@shared/errors/AppError';

interface IRequest {
  id: string;
}

class ShowUserService {
  public async execute({ id }: IRequest): Promise<User> {

    const userRepository = getCustomRepository(UserRepository);

    const user = await userRepository.findOne(id);

    if(!user) {
      throw new AppError('Usuário não encontrado.');
    }
    return user;
  }
}

export default ShowUserService;
