import { HttpException, Injectable } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { PrismaService } from 'src/config/database/prisma.service';

@Injectable()
export class UserService {
  constructor(private readonly prisma: PrismaService) {}
  create(createUserDto: CreateUserDto) {
    return 'This action adds a new user';
  }

  findAll() {
    try {
      const result = this.prisma.user.findMany();
      return result;
    } catch (err) {
      console.log(err);
      throw new HttpException('User not found', 404);
    }
  }

  async findOne(id: string) {
    try {
      const result = await this.prisma.user.findUniqueOrThrow({
        where: { uuid: id },
      });
      return result;
    } catch (err) {
      console.log(err);
      throw new HttpException('User not found', 404);
    }
  }

  update(id: number, updateUserDto: UpdateUserDto) {
    return `This action updates a #${id} user`;
  }

  remove(id: number) {
    return `This action removes a #${id} user`;
  }
}
