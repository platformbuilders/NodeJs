import { EntityRepository, Repository} from 'typeorm';
import User from '../entities/User';

@EntityRepository(User)
export class UserRepository extends Repository<User> {

  public async findbyName(name: string): Promise<User | undefined> {
    const user = this.findOne({
      where: {
        name,
      },
    });

    return user;
  }
}
