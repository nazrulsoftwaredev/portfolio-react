export const sendSuccess = (res, statusCode, data, message, meta) => {
    const payload = {
        status: "success",
        data,
        ...(message ? { message } : {}),
        ...(meta ? { meta } : {}),
    };
    return res.status(statusCode).json(payload);
};
export const sendError = (res, statusCode, code, message, details) => {
    const payload = {
        status: "error",
        error: {
            code,
            message,
            ...(details ? { details } : {}),
        },
    };
    return res.status(statusCode).json(payload);
};
