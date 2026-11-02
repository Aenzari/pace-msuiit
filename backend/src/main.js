import { createApp } from './app.js';
import { getConfig } from './config.js';
import { db } from './database/client.js';

const config = getConfig();
const app = createApp({ db, config });

const server = app.listen(config.port, '0.0.0.0', () => {
  console.log(`Express server listening on http://localhost:${config.port}`);
});

function shutdown() {
  server.close(() => {
    db.$disconnect().finally(() => process.exit(0));
  });
}

process.on('SIGINT', shutdown);
process.on('SIGTERM', shutdown);
