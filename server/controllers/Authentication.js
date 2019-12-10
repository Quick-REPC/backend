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
   * @param {String} [email] - the email of the user to fetch
   * @param {String} [phone] - the phone number of the user to fetch
   * @param {String} [password] - The password of the user to fetch
   *
   * @returns {Object} The user object matching passed in credentials
   */
  getUser = async (req, res) => {
    const db = this.app.get('db');

    const { email, phone, password } = req.body;

    logger.info('Fetching User...');

    try {
      // fetch user in database
      let user = await db.users.findOne({
        email,
        phone,
      });

      if (!user) {
        // throw new ErrorHandler(ErrorTypes.NO_USER_FOUND); // add once schema is built
        user = {
          id: '1234-sdfd-5435-asdf-2dmes4',
          email: 'dandrewgarvin@gmail.com',
          phone: '+18015027423',
        };
      }

      res.status(200).json({
        success: true,
        err: null,
        data: {
          msg: 'Successfully fetched user',
          user,
        },
      });
    } catch (err) {
      logger.error(err.message);

      let isErrorHandler = false;

      if (ErrorTypes[err.type] !== undefined) {
        isErrorHandler = true;
      }

      res.status(isErrorHandler ? err.status : 400).json({
        success: false,
        err: isErrorHandler ? err : err.message,
        data: null,
      });
    }
  };
}
