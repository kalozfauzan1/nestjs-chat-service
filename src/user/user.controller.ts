import {
  Body,
  Controller,
  Get,
  HttpStatus,
  Post,
  Req,
  Res,
} from '@nestjs/common';
import { UserService } from './user.service';
import { User } from './user.entity';

@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Get()
  async getUser(@Req() request, @Res() response) {
    const userData = request['user'];
    const newUser = await this.userService.getUser(userData.uid);
    return await response.status(HttpStatus.OK).json({
      user: newUser,
    });
  }

  @Post('/create')
  async createUser(@Req() request, @Res() response) {
    const userData = request['user'];
    const user = new User();
    user.uid = userData.uid;
    user.email = userData.email;
    user.photoUrl = userData.picture;
    user.name = userData.name;
    user.provider = userData.firebase.sign_in_provider;
    const newUser = await this.userService.createUser(user);
    return response.status(HttpStatus.CREATED).json({
      user: newUser,
    });
  }
}
