export default interface Logger {
    info(message: string): void;
    error(message: string, error?: Error): void;
    warn(message: string): void;
    debug(message: string): void;
    verbose(message: string): void;
}
