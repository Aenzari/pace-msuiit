import { createApp } from "./app.js";
import { getConfig } from "./config.js";
import { db } from "./database/client.js";
import { cleanupExpiredSessions } from "./services/auth.service.js";

const config = getConfig();
const app = createApp({ db, config });

const server = app.listen(config.port, "0.0.0.0", () => {
  console.log(`Express server listening on http://localhost:${config.port}`);
});

const CLEANUP_INTERVAL_MS = 6 * 60 * 60 * 1000;

// Immediate cleanup on boot
cleanupExpiredSessions({ db })
  .then((count) => {
    if (count > 0) console.log(`Startup: cleaned up ${count} expired session(s)`);
  })
  .catch((err) => console.error("Initial session cleanup failed:", err.message));

const cleanupTimer = setInterval(async () => {
  try {
    const count = await cleanupExpiredSessions({ db });
    if (count > 0) {
      console.log(`Cleaned up ${count} expired session(s)`);
    }
  } catch (error) {
    console.error("Session cleanup failed:", error.message);
  }
}, CLEANUP_INTERVAL_MS);

function shutdown() {
  clearInterval(cleanupTimer);
  server.close(() => {
    db.$disconnect().finally(() => process.exit(0));
  });
}

process.on("SIGINT", shutdown);
process.on("SIGTERM", shutdown);
