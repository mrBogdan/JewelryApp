import * as winston from 'winston';
const format = winston.format;

const printNice = format.printf(info => {
    const {level, message} = info;
    return `${level} - ${message}`;
});

const enumerateErrorFormat = format((info: any) => {
    if (info.message instanceof Error) {
        info.message = Object.assign({
            message: `${info.message.message}\n============\n${info.message.stack}`
        }, info.message);
    }

    if (info instanceof Error) {
        return Object.assign({
            message: `${info.message}\n============\n${info.stack}`
        }, info);
    }

    return info;
});

const logger = winston.createLogger({
    format: format.combine(
        enumerateErrorFormat(),
        format.json()
    ),
    transports: [
        new winston.transports.Console({
            format: format.combine(
                format.colorize(),
                printNice,
            ),
        })
    ]
});

export default logger;