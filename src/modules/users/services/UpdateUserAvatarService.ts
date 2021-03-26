
import { UserRepository } from './../typeorm/repositories/UsersRepository';
import { getCustomRepository } from "typeorm";
import User from '../typeorm/entities/User';
import AppError from '@shared/errors/AppError';
import path from 'path';
import uploaConfig from '@config/upload';
import fs from 'fs';

interface IRequest {
  user_id: string;
  avatarFilename: string;
}

class UpdateUserAvatarService {
  public async execute({user_id, avatarFilename}: IRequest): Promise<User> {
    // utilizando um repo customizado
    const userRepository = getCustomRepository(UserRepository);
    const user = await userRepository.findOne(user_id);
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

    await userRepository.save(user);

    return user;
  }
}

export default UpdateUserAvatarService;
