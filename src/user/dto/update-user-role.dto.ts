import { PartialType } from '@nestjs/swagger';
import { CreateUserDto } from './create-user.dto';
import { IsBoolean, IsNotEmpty } from 'class-validator';

export class UpdateUserRoleDto extends PartialType(CreateUserDto) {
  @IsBoolean()
  @IsNotEmpty()
  isAdmin: boolean;
}
