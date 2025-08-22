import { Injectable, UnauthorizedException } from '@nestjs/common';
import { UsersService } from '../users/users.service';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcrypt';
import { UserRole } from '../../entities/user.entity';

@Injectable()
export class AuthService {
  constructor(
    private readonly usersService: UsersService,
    private readonly jwtService: JwtService,
  ) {}

  async register(username: string, password: string) {
    const user = await this.usersService.create({
      username,
      password,
      role: UserRole.STAFF,
    });
    const token = this.generateToken(user);
    return { user, accessToken: token };
  }

  async login(username: string, password: string) {
    const users = await this.usersService.findAll();
    const user = users.find((u) => u.username === username);
    if (!user) throw new UnauthorizedException('Invalid credentials');
    const match = await bcrypt.compare(password, user.password);
    if (!match) throw new UnauthorizedException('Invalid credentials');

    const token = this.generateToken(user);
    return { user, accessToken: token };
  }

  private generateToken(user: { id: string; username: string }) {
    return this.jwtService.sign({ sub: user.id, username: user.username });
  }
}
