import { Inject, Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import bcrypt from 'bcryptjs';
import { PrismaService } from '../prisma/prisma.service';

@Injectable()
export class AuthService {
  constructor(
    @Inject(PrismaService) private readonly prisma: PrismaService,
    @Inject(JwtService) private readonly jwt: JwtService,
  ) {}

  async login(input: { email: string; password: string }) {
    const user = await this.prisma.user.findUnique({ where: { email: input.email } });
    if (!user) throw new UnauthorizedException('INVALID_CREDENTIALS');

    const ok = await bcrypt.compare(input.password, user.password);
    if (!ok) throw new UnauthorizedException('INVALID_CREDENTIALS');

    const accessToken = await this.jwt.signAsync({
      sub: user.id,
      role: user.role,
      email: user.email,
    });

    return {
      accessToken,
      user: { id: user.id, email: user.email, role: user.role },
    };
  }
}


