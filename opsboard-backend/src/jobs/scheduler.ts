import { runHealthChecks } from "./healthCheck.job.ts";

export const startScheduler = () => {
  console.log("Health check scheduler started");

  // run every 60 seconds
  setInterval(async () => {
    await runHealthChecks();
  }, 60_000);
};
