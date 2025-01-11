import { Body, Controller, Post } from '@nestjs/common';
import { AuthService } from './auth.service';
import { SignUpDto } from './dto/sign-up.dto';
import { SignInDto } from './dto/sign-in.dto';
import { PublicRequest } from './decorators/public-request.decorator';

@Controller()
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @PublicRequest()
  @Post('sign-up')
  async signUp(@Body() signUpData: SignUpDto) {
    return this.authService.signUp(signUpData);
  }

  @PublicRequest()
  @Post('sign-in')
  async signIn(@Body() signInData: SignInDto) {
    return this.authService.signIn(signInData);
  }
}
