import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsUrl } from 'class-validator';

export class CreateServiceDto {
  @IsNotEmpty()
  @ApiProperty({
    description: '서비스 이름',
    required: true,
    example: 'SCG 홈페이지',
  })
  name: string;

  @ApiProperty({
    description: '서비스 URL',
    required: true,
    example: 'https://scg.skku.ac.kr',
  })
  @IsNotEmpty()
  @IsUrl()
  url: string;
}
