import winston from 'winston';

const logger = winston.createLogger({
  level: 'info',
  format: winston.format.json(),
  defaultMeta: { service: 'backend' },
});

export default logger;

//
// If we're not in production then log to the `console` with the format:
// `${info.level}: ${info.message} JSON.stringify({ ...rest }) `
//
if (process.env.NODE_ENV !== 'production') {
  logger.add(
    new winston.transports.Console({
      format: winston.format.combine(
        winston.format.timestamp(),
        winston.format.colorize({ all: true }),
        winston.format.printf(info => {
          const { timestamp, level, message } = info;

          return `${timestamp} ${level}: ${message}`;
        }),
      ),
    }),
  );
}
