import { Injectable } from '@nestjs/common';
import { ReturnModelType } from '@typegoose/typegoose';
import { InjectModel } from 'nestjs-typegoose';
import { User } from './user.entity';

@Injectable()
export class UserService {
  constructor(
    @InjectModel(User) private readonly userModel: ReturnModelType<typeof User>,
  ) {}

  async getChats(): Promise<User[]> {
    return await this.userModel.find();
  }

  async createUser(user: User): Promise<User> {
    const isExist = await this.userModel.findOne({
      uid: user.uid,
    });
    if (isExist) return isExist;
    const createUser = new this.userModel(user);
    return await createUser.save();
  }
  async getUser(uid: string): Promise<User> {
    return await this.userModel.findOne({
      uid: uid,
    });
  }
}
