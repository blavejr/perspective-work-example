import winston from 'winston';
import config from '../../../inbound/http/utils/config';

const logger = winston.createLogger({
    level: 'info',
    format: winston.format.json(),
    defaultMeta: { service: 'API-Server' },
    transports: [
        new winston.transports.File({ filename: './error.log', level: 'error' }),
        new winston.transports.File({ filename: './combined.log' }),
    ],
});

if (config.nodeEnv !== 'production') {
    logger.add(
        new winston.transports.Console({
            format: winston.format.simple(),
        }),
    );
}

export default logger;
