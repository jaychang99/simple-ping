import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  Req,
} from '@nestjs/common';
import { UserService } from './user.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { JwtAuth } from 'src/decorators/jwt-auth.decorator';
import { AuthenticatedRequest } from 'src/auth/interfaces/authenticated-request.interface';
import { IsAdmin } from 'src/decorators/is-admin.decorator';
import { ApiCookieAuth } from '@nestjs/swagger';

@Controller('users')
@IsAdmin()
@ApiCookieAuth('access_token')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Post()
  create(@Body() createUserDto: CreateUserDto) {
    return this.userService.create(createUserDto);
  }

  @Get()
  findAll() {
    return this.userService.findAll();
  }

  @Get('me')
  @JwtAuth()
  async getMe(@Req() request: AuthenticatedRequest) {
    const userUuid = request.user.userId;
    return this.userService.findOne(userUuid);
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.userService.findOne(id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateUserDto: UpdateUserDto) {
    return this.userService.update(+id, updateUserDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.userService.remove(+id);
  }
}
