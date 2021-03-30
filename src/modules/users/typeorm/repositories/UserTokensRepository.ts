import { EntityRepository, getConnection, Repository} from 'typeorm';
import UserToken from '../entities/UserToken';

// formato antigo extende o repository padaro do typeorm
@EntityRepository(UserToken)
export class UserTokensRepository{
  private repo: Repository<UserToken>;
  constructor() {
    this.repo = getConnection().getRepository(UserToken);
  }

  public async findByToken(token: string): Promise<UserToken | undefined> {
    const userToken = this.repo.findOne({
      where: {
        token,
      },
    });

    return userToken;
  }

  public async generate(user_id: string): Promise<UserToken> {
    const userToken = this.repo.create({
      user_id
    });

    await this.repo.save(userToken);
    return userToken;
  }
}

export default UserTokensRepository;
