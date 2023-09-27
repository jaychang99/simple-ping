import { HttpException, Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { Cron } from '@nestjs/schedule';
import axios, { AxiosError } from 'axios';
import { generateSlackReporting } from 'src/utils/generateSlackReporting';
import { generateSlackReportingSuccess } from 'src/utils/generateSlackReportingSuccess';

const HEADERS = {
  headers: {
    'Content-Type': 'application/json',
  },
};
const DEFAULT_CHECK_SITE = 'https://www.naver.com';

@Injectable()
export class AppService {
  constructor(private readonly config: ConfigService) {}
  getHello(): string {
    return 'Hello World!';
  }
  // @Cron('45 * * * * *') // 크론 잡 실행 원할 시
  async checkSite(site: string) {
    // if (!site) throw new HttpException('Site is required!', 400);
    const checkedSite = site ?? DEFAULT_CHECK_SITE;
    console.log('CRON JOB STARTED');
    try {
      await axios.get(checkedSite);
      try {
        await axios.post(
          this.config.get('SLACK_WEBHOOK_URL'),
          generateSlackReportingSuccess(checkedSite),
          HEADERS,
        );
      } catch (err) {
        console.log(err);
      }

      return {
        status: 'UP',
        site: site,
        checkedAt: new Date().toISOString(),
      };
    } catch (err) {
      console.log(err);
      const error = err as AxiosError;

      const errorCode = error.code;

      try {
        await axios.post(
          this.config.get('SLACK_WEBHOOK_URL'),
          generateSlackReporting(checkedSite, errorCode),
          HEADERS,
        );
      } catch (err) {
        console.log(err);
      }

      return {
        status: 'DOWN',
        site: checkedSite,
        checkedAt: new Date().toISOString(),
      };
    }
  }
}
