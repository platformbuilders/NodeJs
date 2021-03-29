
import { UsersRepository } from '../typeorm/repositories/UsersRepository';
import { getCustomRepository } from "typeorm";
import User from '../typeorm/entities/User';

interface IPagination {
  from: number;
  to: number;
  per_page: number;
  total: number;
  current_page: number;
  prev_page: number | null;
  next_page: number | null;
  data: User[];
}
class ListUserService {
  public async execute(): Promise<IPagination> {

    const userRepository = getCustomRepository(UsersRepository);

    const user = await userRepository.createQueryBuilder().paginate();

    return user as IPagination;
  }
}

export default ListUserService;
