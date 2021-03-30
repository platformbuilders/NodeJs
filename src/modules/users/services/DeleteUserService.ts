
import { UsersRepository } from '../typeorm/repositories/UsersRepository';
import AppError from '@shared/errors/AppError';
import { injectable, inject } from 'tsyringe';

interface IRequest {
  id: string;
}
@injectable()
class DeleteUserService {
  constructor(
    @inject('UsersRepository')
    private userRepository: UsersRepository
    ) {};

  public async execute({ id }: IRequest): Promise<void> {

    const user = await this.userRepository.findOne(id);

    if(!user) {
      throw new AppError('Usuário não encontrado.');
    }
    // atencao nao remover so alterar status
    await this.userRepository.remove(user);

  }
}

export default DeleteUserService;
