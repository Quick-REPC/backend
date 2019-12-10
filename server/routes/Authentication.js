import logger from '../utils/Logger';

import AuthenticationController from '../controllers/Authentication';

export default function Authentication(app) {
  const validate = app.get('validate');
  const validators = app.get('validators');

  // Initialize controllers
  const auth = new AuthenticationController(app);

  // GET endpoints
  app.get('/api/v1/auth/get-user', validate(validators.User.AuthenticateUser), auth.getUser);

  // POST endpoints
  // app.post('/api/v1/auth/create-user', validate(validators.User.CreateUser), auth.createUser);

  // INITIALIZED LOGGER MESSAGE
  logger.log({
    level: 'info',
    message: 'Successfully initialized Authentication Controller',
  });
}
