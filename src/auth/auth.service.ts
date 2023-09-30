import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import * as jwt from 'jsonwebtoken';
import { PrismaService } from 'src/config/database/prisma.service';

@Injectable()
export class AuthService {
  constructor(
    private readonly configService: ConfigService,
    private readonly prisma: PrismaService,
  ) {}

  async createToken(user: any) {
    // Check if the user exists in the database
    let dbUser = await this.prisma.user.findUnique({
      where: {
        googleId: user.googleId,
      },
    });

    // If the user doesn't exist, create a new user in the database
    if (!dbUser) {
      dbUser = await this.prisma.user.create({
        data: {
          email: user.email,
          firstName: user.firstName,
          lastName: user.lastName,
          googleId: user.googleId,
        },
      });
    }

    // Payload to include in the token
    const payload = {
      userId: dbUser.uuid,
      email: dbUser.email,
    };

    // Secret key to sign the token
    const secret = this.configService.get('JWT_SECRET');

    // Token expiration time
    const expiresIn = '24h';

    // Create a token
    const token = jwt.sign(payload, secret, { expiresIn });

    return token;
  }
}
