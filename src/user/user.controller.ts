import { Controller, Get, Param } from '@nestjs/common';
import { UserService } from './user.service';

@Controller('users')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Get(':id')
  findOneById(@Param('id') id: number) {
    return this.userService.findOneBy('id', id);
  }
}
