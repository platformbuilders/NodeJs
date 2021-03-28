
import { EntityRepository, Repository} from 'typeorm';
import User from '../entities/User';

@EntityRepository(User)
export class UsersRepository extends Repository<User> {

  public async findbyEmail(email: string): Promise<User | undefined> {
    const user = this.findOne({
      where: {
        email,
      },
    });

    return user;
  }

  public async findbyName(name: string): Promise<User | undefined> {
    const user = this.findOne({
      where: {
        name,
      },
    });

    return user;
  }
}

export default UsersRepository;
