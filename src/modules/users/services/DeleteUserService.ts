
import { UserRepository } from '../typeorm/repositories/UsersRepository';
import { getCustomRepository } from "typeorm";
import AppError from '@shared/errors/AppError';

interface IRequest {
  id: string;
}

class DeleteUserService {
  public async execute({ id }: IRequest): Promise<void> {

    const userRepository = getCustomRepository(UserRepository);

    const user = await userRepository.findOne(id);

    if(!user) {
      throw new AppError('Usuário não encontrado.');
    }
    // atencao nao remover so alterar status
    await userRepository.remove(user);

  }
}

export default DeleteUserService;
