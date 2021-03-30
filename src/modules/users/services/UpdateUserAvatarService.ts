
import { UsersRepository } from './../typeorm/repositories/UsersRepository';
import User from '../typeorm/entities/User';
import AppError from '@shared/errors/AppError';
import path from 'path';
import uploaConfig from '@config/upload';
import fs from 'fs';
import { injectable, inject } from 'tsyringe';
interface IRequest {
  user_id: string;
  avatarFilename: string;
}
@injectable()
class UpdateUserAvatarService {
  constructor(
    @inject('UsersRepository')
    private userRepository: UsersRepository
    ) {};

  public async execute({user_id, avatarFilename}: IRequest): Promise<User> {

    const user = await this.userRepository.findOne(user_id);
    // testar findone e migrar um update de avatar
    if(!user) {
      throw new AppError('User not found');
    }

    if (user.avatar) {
      const userAvatarFilePath = path.join(uploaConfig.directory, user.avatar);
      const userAvatarFileExists = await fs.promises.stat(userAvatarFilePath);

      if (userAvatarFileExists) {
        await fs.promises.unlink(userAvatarFilePath);
      }
    }

    user.avatar = avatarFilename;

    await this.userRepository.save(user);

    return user;
  }
}

export default UpdateUserAvatarService;
