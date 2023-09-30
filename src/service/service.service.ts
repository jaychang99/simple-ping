import { HttpException, Injectable } from '@nestjs/common';
import { CreateServiceDto } from './dto/create-service.dto';
import { UpdateServiceDto } from './dto/update-service.dto';
import { PrismaService } from 'src/config/database/prisma.service';
import { ServiceListWithLogsQueryDto } from 'src/service/dto/service-list-with-logs-query.dto';
import * as dayjs from 'dayjs';
@Injectable()
export class ServiceService {
  constructor(private readonly prisma: PrismaService) {}

  async create(createServiceDto: CreateServiceDto) {
    try {
      const result = await this.prisma.service.create({
        data: createServiceDto,
      });
      return result;
    } catch (err) {
      console.log(err);
      throw new HttpException('Service already exists', 400);
    }
  }

  async findAll() {
    // find services
    const result = await this.prisma.service.findMany(
      // filter deletedAt column
      { where: { deletedAt: null } },
    );

    return result;
  }

  async findAllWithLogs(query: ServiceListWithLogsQueryDto) {
    const { startDate, endDate } = query;

    // 한국시간대 대응
    const queryStartDate = dayjs(startDate).add(9, 'hour').toDate();
    const queryEndDate = dayjs(endDate)
      .add(9 + 24, 'hour')
      .toDate();

    const result = await this.prisma.service.findMany({
      where: { deletedAt: null },
      include: {
        // filter logs by date range and order by date column, latest first
        logs: {
          where: {
            date: {
              gte: queryStartDate,
              lte: queryEndDate,
            },
          },
          orderBy: { date: 'asc' },
        },
      },
    });

    return result;
  }

  async findOne(id: string) {
    try {
      const result = await this.prisma.service.findUniqueOrThrow({
        where: { uuid: id, deletedAt: null },
      });
      return result;
    } catch (err) {
      console.log(err);
      throw new HttpException('Service not found', 404);
    }
  }

  async update(id: string, updateServiceDto: UpdateServiceDto) {
    try {
      const result = await this.prisma.service.update({
        where: { uuid: id },
        data: updateServiceDto,
      });
      return result;
    } catch (err) {
      console.log(err);
      throw new HttpException('Service not found', 404);
    }
  }

  async remove(id: string) {
    try {
      // find service with uuid is id , and set deletedAt column to current time
      const result = await this.prisma.service.update({
        where: { uuid: id },
        data: { deletedAt: new Date() },
      });
      return result;
    } catch (err) {
      console.log(err);
      throw new HttpException('Service not found', 404);
    }
  }
}
