import { Module, Global } from '@nestjs/common';
import { PrismaService } from 'src/config/database/prisma.service';

@Global()
@Module({
  providers: [PrismaService],
  exports: [PrismaService],
})
export class PrismaModule {}
