import { IsNotEmpty, IsUrl } from 'class-validator';

export class CreateServiceDto {
  @IsNotEmpty()
  name: string;

  @IsUrl()
  url: string;
}
