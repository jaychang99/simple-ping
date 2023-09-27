import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';

import * as jwt from 'jsonwebtoken';

@Injectable()
export class AuthService {
  constructor(private readonly configService: ConfigService) {}

  createToken(user: any) {
    // Payload to include in the token
    const payload = {
      email: user.email,
      googleId: user.googleId,
    };

    // Secret key to sign the token, store this in environment variables
    const secret =
      this.configService.get('JWT_SECRET_KEY') || 'your-secret-key';

    // Token expiration time
    const expiresIn = '1h';

    // Create a token
    const token = jwt.sign(payload, secret, { expiresIn });

    return token;
  }
}
