export const generateSlackReportingSuccess = (site: string) => {
  return {
    text: `✅ ${site} 서비스 정상 작동 중입니다. ✅`,
    blocks: [
      {
        type: 'section',
        text: {
          type: 'mrkdwn',
          text: `✅ ${site} 서비스 정상 작동 중입니다. ✅`,
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
