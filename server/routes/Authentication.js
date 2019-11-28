import logger from '../utils/Logger';

import AuthenticationController from '../controllers/Authentication';

export default function Authentication(app) {
  // Initialize controllers
  const auth = new AuthenticationController(app);

  // GET endpoints
  app.get('/api/v1/auth/get-user', auth.getUser);

  // POST endpoints
  // app.post('/api/v1/auth', auth.createUser);

  // INITIALIZED LOGGER MESSAGE
  logger.log({
    level: 'info',
    message: 'Successfully initialized Authentication Controller',
  });
}
