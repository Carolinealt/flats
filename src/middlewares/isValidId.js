import { isValidObjectId } from 'mongoose';
import createHttpError from 'http-errors';

export const isValidId = (req, res, next) => {
    const { flatId } = req.params;
    if (!isValidObjectId(flatId)) {
        throw createHttpError(400, 'Bad Request');
    }

    next();
};