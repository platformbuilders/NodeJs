import { EntityRepository, Repository} from 'typeorm';
import User from '../entities/User';

@EntityRepository(User)
export class UserRepository extends Repository<User> {

  public async findbyEmail(email: string): Promise<User | undefined> {
    const user = this.findOne({
      where: {
        email,
      },
    });

    return user;
  }
}
