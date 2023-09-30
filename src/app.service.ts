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

    for (const site of sites) {
      console.log('checking site', site.url);
      const startTime = new Date().getTime();

      try {
        await axios.get(site.url);
        console.log('SUCCESS');

        const endTime = new Date().getTime();
        const successData = {
          type: 'check',
          value: 'SUCCESS',
          serviceUuid: site.uuid,
          responseTime: endTime - startTime,
        };

        const latestLog = await this.prisma.log.findFirst({
          where: { serviceUuid: site.uuid },
          orderBy: { date: 'desc' },
        });

        await this.prisma.log.create({
          data: successData,
        });

        if (latestLog.value === 'SUCCESS') continue;
        await axios.post(
          this.configService.get('SLACK_WEBHOOK_URL'),
          generateSlackReportingSuccess(site.url),
          HEADERS,
        );
      } catch (error) {
        console.log('ERROR');
        const errorData = {
          type: 'check',
          value: 'ERROR',
          serviceUuid: site.uuid,
          responseTime: null,
        };
        // check for the latest log and if the latest log is error, don't send slack message
        const latestLog = await this.prisma.log.findFirst({
          where: { serviceUuid: site.uuid },
          orderBy: { date: 'desc' },
        });

        await this.prisma.log.create({
          data: errorData,
        });

        if (latestLog.value === 'ERROR') continue;
        await axios.post(
          this.configService.get('SLACK_WEBHOOK_URL'),
          generateSlackReporting(site.url, error.code),
          HEADERS,
        );
      }
    }
    return;
  }
}
