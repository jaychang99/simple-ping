export const generateSlackReportingSuccess = (site: string) => {
  return {
    text: `✅ ${site} 서비스 오류 상태에서 정상으로 복구 되었습니다. ✅`,
    blocks: [
      {
        type: 'section',
        text: {
          type: 'mrkdwn',
          text: `✅ ${site} 서비스 오류 상태에서 정상으로 복구 되었습니다. ✅`,
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
