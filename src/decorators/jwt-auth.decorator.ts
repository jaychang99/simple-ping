import { applyDecorators, UseGuards } from '@nestjs/common';
import { JwtAuthGuard } from 'src/auth/guards/jwt-auth.guard';

export function JwtAuth() {
  return applyDecorators(UseGuards(JwtAuthGuard));
}
