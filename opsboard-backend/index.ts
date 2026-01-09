import 'dotenv/config'; 
import app from "./src/app.ts";
import { runHealthChecks } from "./src/jobs/healthCheck.job.ts";
import { startScheduler } from "./src/jobs/scheduler.ts";
const PORT = process.env.PORT || 4000;

app.listen(PORT, () => {
  console.log(`OpsBoard running on port ${PORT}`);
  // runHealthChecks();
  startScheduler();
});
