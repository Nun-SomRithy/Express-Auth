import pino from 'pino';
import pinoPretty from 'pino-pretty';

const logger = pino({
// @ts-ignore
    prettifier: pinoPretty
});

export default logger;