import { applyDecorators, UseGuards } from '@nestjs/common';
import { IsAdminGuard } from '../auth/guards/is-admin.guard';

export function IsAdmin() {
  return applyDecorators(UseGuards(IsAdminGuard));
}
