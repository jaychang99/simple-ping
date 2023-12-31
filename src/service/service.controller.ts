import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  Query,
  ValidationPipe,
  BadRequestException,
} from '@nestjs/common';
import { ServiceService } from './service.service';
import { CreateServiceDto } from './dto/create-service.dto';
import { UpdateServiceDto } from './dto/update-service.dto';
import { ApiCookieAuth, ApiOperation, ApiTags } from '@nestjs/swagger';
import { IsAdmin } from 'src/decorators/is-admin.decorator';
import { ServiceListWithLogsQueryDto } from 'src/service/dto/service-list-with-logs-query.dto';

@Controller('services')
@ApiTags('서비스 (프로젝트)')
export class ServiceController {
  constructor(private readonly serviceService: ServiceService) {}

  @Post()
  @ApiOperation({
    summary: '서비스 추가',
    description: '단일 서비스 추가 가능',
  })
  @IsAdmin()
  @ApiCookieAuth('access_token')
  create(@Body() createServiceDto: CreateServiceDto) {
    return this.serviceService.create(createServiceDto);
  }

  @Get()
  @IsAdmin()
  @ApiCookieAuth('access_token')
  findAll() {
    return this.serviceService.findAll();
  }

  @Get('/logs')
  @IsAdmin()
  @ApiCookieAuth('access_token')
  findAllWithLogs(
    @Query(new ValidationPipe()) query: ServiceListWithLogsQueryDto,
  ) {
    return this.serviceService.findAllWithLogs(query);
  }

  @Get(':id')
  @IsAdmin()
  @ApiCookieAuth('access_token')
  findOne(@Param('id') id: string) {
    return this.serviceService.findOne(id);
  }

  @Patch(':id')
  @ApiOperation({
    summary: '서비스 수정',
    description: '단일 서비스 수정 가능',
  })
  @IsAdmin()
  @ApiCookieAuth('access_token')
  update(@Param('id') id: string, @Body() updateServiceDto: UpdateServiceDto) {
    return this.serviceService.update(id, updateServiceDto);
  }

  @Delete(':id')
  @ApiOperation({
    summary: '서비스 삭제',
    description: '단일 서비스 삭제 (soft delete)',
  })
  @IsAdmin()
  @ApiCookieAuth('access_token')
  remove(@Param('id') id: string) {
    return this.serviceService.remove(id);
  }
}
