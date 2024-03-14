import winston from 'winston';
import config from '../../../inbound/http/utils/config';
import { Logger as WinstonLogger } from 'winston';
import Logger from '../../../../domain/loggers/logger.interface';

export default class WinstonLoggerAdapter implements Logger {
    private winstonLogger: WinstonLogger;

    constructor() {
        this.winstonLogger = this.setup();
    }

    private setup() {
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

        return logger;
    }

    info(message: string): void {
        this.winstonLogger.info(message);
    }

    error(message: string, error?: Error): void {
        if (error) {
            this.winstonLogger.error(message, { error });
        } else {
            this.winstonLogger.error(message);
        }
    }

    warn(message: string): void {
        this.winstonLogger.warn(message);
    }

    debug(message: string): void {
        this.winstonLogger.debug(message);
    }

    verbose(message: string): void {
        this.winstonLogger.verbose(message);
    }
}
