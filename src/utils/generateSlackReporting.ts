export const generateSlackReporting = (site: string, errorCode: string) => {
  return {
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
  };
};
