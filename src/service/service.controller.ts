import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from '@nestjs/common';
import { ServiceService } from './service.service';
import { CreateServiceDto } from './dto/create-service.dto';
import { UpdateServiceDto } from './dto/update-service.dto';
import { ApiCookieAuth, ApiOperation, ApiTags } from '@nestjs/swagger';
import { IsAdmin } from 'src/decorators/is-admin-decorator';

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
  findAll() {
    return this.serviceService.findAll();
  }

  @Get('/logs')
  findAllWithLogs() {
    return this.serviceService.findAllWithLogs();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.serviceService.findOne(+id);
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
  remove(@Param('id') id: string) {
    return this.serviceService.remove(+id);
  }
}
