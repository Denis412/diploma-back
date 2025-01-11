import { Injectable, NotFoundException } from '@nestjs/common';
import * as bcrypt from 'bcryptjs';
import { UserService } from 'src/user/user.service';
import { SignUpDto } from './dto/sign-up.dto';
import { SignInDto } from './dto/sign-in.dto';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class AuthService {
  constructor(
    private readonly userService: UserService,
    private readonly jwtService: JwtService,
  ) {}

  async signUp(signUpDto: SignUpDto) {
    const hashedPassword = await bcrypt.hash(signUpDto.password, 10);

    const createdUser = await this.userService.create({
      ...signUpDto,
      password: hashedPassword,
    });
    return createdUser;
  }

  async signIn(signInDto: SignInDto) {
    const targetUser = await this.validateUser(signInDto);

    if (!targetUser) {
      throw new NotFoundException('Неверный логин или пароль.');
    }

    const jwtPayload = {
      id: targetUser.id,
      email: targetUser.email,
      role: 'user',
    };

    return {
      tokenType: 'Bearer',
      accessToken: this.jwtService.sign(jwtPayload),
      refreshToken: this.jwtService.sign(jwtPayload, {
        expiresIn: '14d',
      }),
    };
  }

  async validateUser(signInDto: SignInDto) {
    const targetUser = await this.userService.findOneBy(
      'email',
      signInDto.email,
    );

    if (
      targetUser &&
      (await bcrypt.compare(signInDto.password, targetUser.password))
    ) {
      return targetUser;
    }

    return null;
  }
}
