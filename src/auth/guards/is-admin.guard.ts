import {
  Injectable,
  CanActivate,
  ExecutionContext,
  UnauthorizedException,
} from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { Reflector } from '@nestjs/core';
import * as jwt from 'jsonwebtoken';
import { PrismaService } from 'src/config/database/prisma.service';

@Injectable()
export class IsAdminGuard implements CanActivate {
  constructor(
    private reflector: Reflector,
    private prisma: PrismaService,
    private configService: ConfigService,
  ) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const request = context.switchToHttp().getRequest();

    // Get the JWT from the request's cookies
    const token = request.cookies['jwt'];

    if (!token) {
      throw new UnauthorizedException('No token found');
    }

    let userId: string;
    try {
      // Decode the token and get the userId
      const decoded = jwt.verify(
        token,
        this.configService.get('JWT_SECRET'),
      ) as any;
      userId = decoded.userId;
    } catch (e) {
      throw new UnauthorizedException('Invalid token');
    }

    // Find the user in the database by userId
    const user = await this.prisma.user.findUnique({
      where: { uuid: userId },
    });

    if (!user) {
      throw new UnauthorizedException('User not found');
    }

    // Check the isAdmin property of the user
    if (!user.isAdmin) {
      throw new UnauthorizedException('User is not admin');
    }

    return true;
  }
}
