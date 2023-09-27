import { HttpException, Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import axios, { AxiosError } from 'axios';
import { generateSlackReporting } from 'src/utils/generateSlackReporting';

const HEADERS = {
  headers: {
    'Content-Type': 'application/json',
  },
};
@Injectable()
export class AppService {
  constructor(private readonly config: ConfigService) {}
  getHello(): string {
    return 'Hello World!';
  }

  async checkSite(site: string) {
    if (!site) throw new HttpException('Site is required!', 400);

    try {
      await axios.get(site);

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
          generateSlackReporting(site, errorCode),
          HEADERS,
        );
      } catch (err) {
        console.log(err);
      }

      return {
        status: 'DOWN',
        site: site,
        checkedAt: new Date().toISOString(),
      };
    }
  }
}
