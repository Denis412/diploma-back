import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from './entities/user.entity';
import { Repository } from 'typeorm';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User) private readonly userRepository: Repository<User>,
  ) {}

  async create(createUserDto: CreateUserDto) {
    const createdUser = this.userRepository.create({
      ...createUserDto,
      fullname: {
        firstName: createUserDto.firstName,
        middleName: createUserDto.middleName,
        lastName: createUserDto.lastName,
      },
    });

    return await this.userRepository.save(createdUser);
  }

  async findOneBy(key: string, value: any) {
    const targetUser = await this.userRepository.findOneBy({ [key]: value });

    if (!targetUser) {
      throw new NotFoundException(`Пользователь с ${key} ${value} не найден.`);
    }

    return targetUser;
  }
}
