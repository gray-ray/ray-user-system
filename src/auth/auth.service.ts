import { Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { UserService } from 'src/user/user.service';

@Injectable()
export class AuthService {
  constructor(
    private userService: UserService,
    private jwtService: JwtService,
  ) {}

  async signIn(username: string, password: string) {
    const user = await this.userService.findByName(username);
    if (user?.password !== password) {
      throw new UnauthorizedException();
    }

    const payload = {
      username,
      password,
      roles: user?.roles?.map((o) => o?.name),
    };

    return await this.jwtService.signAsync(payload);
  }
}
