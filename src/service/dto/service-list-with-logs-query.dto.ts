import { IsDateString } from 'class-validator';

export class ServiceListWithLogsQueryDto {
  @IsDateString()
  startDate?: string;

  @IsDateString()
  endDate?: string;
}
