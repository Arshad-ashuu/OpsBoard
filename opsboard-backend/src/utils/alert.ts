export const sendAlert = (
  serviceName: string,
  env: string,
  url: string,
  failureCount: number
) => {
  console.log(
    `🚨 ALERT | ${serviceName} [${env}] DOWN (${failureCount} failures) | ${url}`
  );
};
