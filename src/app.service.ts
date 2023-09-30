import { HttpException, Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { Cron } from '@nestjs/schedule';
import axios, { AxiosError } from 'axios';
import { PrismaService } from 'src/config/database/prisma.service';
import { generateSlackReporting } from 'src/utils/generateSlackReporting';
import { generateSlackReportingSuccess } from 'src/utils/generateSlackReportingSuccess';

const HEADERS = {
  headers: {
    'Content-Type': 'application/json',
  },
};

@Injectable()
export class AppService {
  constructor(
    private readonly configService: ConfigService,
    private prisma: PrismaService,
  ) {}
  getHello(): string {
    return 'Hello World!';
  }
  @Cron('*/10 * * * *', {
    disabled: process.env.STATUS_NODE_ENV === 'local',
  }) // 크론 잡 실행 원할 시
  async checkSite(site: string) {
    // if (!site) throw new HttpException('Site is required!', 400);

    // get all sites from db
    const sites = await this.prisma.service.findMany();
    console.log(sites);

    for await (const site of sites) {
      const startTime = new Date().getTime();

      try {
        await axios.get(site.url);

        const endTime = new Date().getTime();
        const successData = {
          type: 'check',
          value: 'SUCCESS',
          serviceUuid: site.uuid,
          responseTime: endTime - startTime,
        };
        await this.prisma.log.create({
          data: successData,
        });
      } catch (error) {
        const errorData = {
          type: 'check',
          value: 'ERROR',
          serviceUuid: site.uuid,
          responseTime: null,
        };
        await this.prisma.log.create({
          data: errorData,
        });
        // await axios.post(
        //   this.config.get('SLACK_WEBHOOK_URL'),
        //   generateSlackReporting(site.url, error.code),
        //   HEADERS,
        // );
      }
    }
    return;
  }
}
