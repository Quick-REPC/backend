import logger from '../utils/Logger';

export default function ErrorHandler(error) {
  logger.error(error.type);

  return error;
}
