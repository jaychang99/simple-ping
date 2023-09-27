import { HttpException, Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import axios, { AxiosError } from 'axios';

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
          {
            text: `🚫 ${site} 서비스가 다운되었습니다. 🚫`,
            blocks: [
              {
                type: 'section',
                text: {
                  type: 'mrkdwn',
                  text: `🚫 ${site} 서비스가 다운되었습니다. 🚫 ERROR CODE: ${errorCode}`,
                },
                accessory: {
                  type: 'button',
                  text: {
                    type: 'plain_text',
                    text: '사이트 바로가기',
                  },
                  url: site,
                },
              },
            ],
          },
          {
            headers: {
              'Content-Type': 'application/json',
            },
          },
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
