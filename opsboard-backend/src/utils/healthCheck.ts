export const checkServiceHealth = async (url: string): Promise<"UP" | "DOWN"> => {
  try {
    const controller = new AbortController();
    const timeout = setTimeout(() => controller.abort(), 3000); // 3s timeout

    const res = await fetch(url, {
      method: "GET",
      signal: controller.signal
    });

    clearTimeout(timeout);

    if (res.ok) {
      return "UP";
    }
    return "DOWN";
  } catch (err) {
    return "DOWN";
  }
};
