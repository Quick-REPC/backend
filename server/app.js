const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const massive = require('massive');
const Sentry = require('@sentry/node');

import routes from './routes';

function init() {
  return new Promise(resolve => {
    // Create server instance
    const app = express();

    const environment = process.env.ENVIRONMENT;

    Sentry.init({ dsn: process.env.SENTRY_KEY, environment });

    // ==================== TOP-LEVEL MIDDLEWARE ==================== //
    app.use(Sentry.Handlers.requestHandler());
    app.use(cors());
    app.use(bodyParser.json());

    massive({
      host: process.env.DB_HOST,
      user: process.env.DB_USERNAME,
      password: process.env.DB_PASSWORD,
      port: process.env.DB_PORT,
      database: process.env.DB_DATABASE,
      ssl: true,
    }).then(db => {
      console.log('✅ Database Initialized');
      app.set('db', db);

      // ===================== DEFINE REST ROUTES ===================== //
      app.get('/health', (req, res) => {
        res.status(200).send('Working');
      });

      routes(app);

      if (environment === 'Development') {
        app.get('/debug-sentry', function mainHandler(req, res) {
          throw new Error('ooga booga break the things');
        });
      }

      app.use(Sentry.Handlers.errorHandler());

      // ======================== START SERVER ======================== //
      if (!module.parent) {
        const PORT = process.env.PORT || 4000;
        app.listen(PORT, () => {
          console.log(`🚀 Listening on port ${PORT}`);
        });
      }

      resolve(app);
    });
  });
}

if (!module.parent) {
  init(); // start server
}

export default init; // passed to parent for testing purposes
