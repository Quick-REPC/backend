import logger from '../utils/Logger';
import { ErrorHandler, ErrorTypes } from '../errors';

export default class AuthenticationController {
  constructor(app) {
    this.app = app;
  }

  /**
   * @name getUser
   * @version 1.0.0
   *
   * @param {UUID} req.params.uuid - the uuid of the user to fetch
   * @param {String} req.params.email - the email of the user to fetch
   * @param {String} req.params.password - The password of the user to fetch
   *
   * @returns {Object} The user object matching passed in credentials
   */
  getUser = async (req, res) => {
    const db = this.app.get('db');

    const { uuid, email, password } = req.params;

    logger.log({ level: 'info', message: 'Fetching User...' });

    try {
      if (!uuid || (!email && !password)) {
        throw new ErrorHandler(ErrorTypes.MISSING_USER_CREDENTIALS);
      }

      res.status(200).json({
        success: true,
        err: null,
        data: {
          msg: 'Successfully fetched user',
        },
      });
    } catch (err) {
      res.status(err.statusCode).json({
        success: false,
        err: err,
        data: null,
      });
    }
  };
}
