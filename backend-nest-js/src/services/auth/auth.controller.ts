import { Body, Controller, Post } from '@nestjs/common';
import { AuthService } from './auth.service';
import { User } from 'src/entities/user.entity';

@Controller('/api/v1/auth/')
export class AuthController {
  constructor(private usersService: AuthService) {}

  @Post('signIn')
  async signIn(@Body() { username }: User): Promise<User> {
    return await this.usersService.signIn(username);
  }
}
