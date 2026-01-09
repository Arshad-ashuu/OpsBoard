import prisma from "../config/db.ts";
import { checkServiceHealth } from "../utils/healthCheck.ts";
import { sendAlert } from "../utils/alert.ts";
import { sendMail } from "../utils/mailer.ts";

/**
 * 🔔 Notify all registered alert emails
 */
const notifyByEmail = async (message: string) => {
  const emails = await prisma.alertEmail.findMany();
  if (emails.length === 0) return;

  await sendMail(
    emails.map(e => e.email),
    "OpsBoard Alert",
    message
  );
};

export const runHealthChecks = async () => {
  const services = await prisma.service.findMany();

  for (const service of services) {
    // 🔹 OLD STATUS
    const prevStatus = service.status;

    // 🔹 NEW STATUS
    const status = await checkServiceHealth(service.url);

    const nextFailureCount =
      status === "DOWN" ? service.failureCount + 1 : 0;

    // 🔹 UPDATE DB
    await prisma.service.update({
      where: { id: service.id },
      data: {
        status,
        lastCheckedAt: new Date(),
        failureCount: nextFailureCount,
      },
    });

    // 🔔 INTERNAL ALERT (after threshold)
    if (status === "DOWN" && nextFailureCount >= 3) {
      sendAlert(
        service.name,
        service.environment,
        service.url,
        nextFailureCount
      );
    }

    // 📧 EMAIL ALERT (ONLY ON STATE CHANGE)
    if (prevStatus !== status) {
      await notifyByEmail(
        `Service "${service.name}" (${service.environment}) is now ${status}\nURL: ${service.url}`
      );
    }

    console.log(`[HealthCheck] ${service.name} -> ${status}`);
  }
};
