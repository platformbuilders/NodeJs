
import { UsersRepository } from '../typeorm/repositories/UsersRepository';
import User from '../typeorm/entities/User';
import AppError from '@shared/errors/AppError';
import { injectable, inject } from 'tsyringe';
interface IRequest {
  id: string;
}
@injectable()
class ShowUserService {
  constructor(
    @inject('UsersRepository')
    private userRepository: UsersRepository
    ) {};

  public async execute({ id }: IRequest): Promise<User> {


    const user = await this.userRepository.findOne(id);

    if(!user) {
      throw new AppError('Usuário não encontrado.');
    }
    return user;
  }
}

export default ShowUserService;
