import jwt from 'jsonwebtoken';
import { promisify } from 'util';

import * as httpStatus from '../constants/HttpStatus.js';
import * as secrets from '../constants/Secrets.js';
import AuthException from './AuthException.js';

const bearer = "bearer ";

export default async (req, res, next) => {

    try {
        let { authorization } = req.headers;
        if (!authorization) {
            throw new AuthException(httpStatus.FORBIDDEN, "Forbidden!");
        }
        let accessToken = authorization;
        if (accessToken.includes(bearer)) {
            accessToken = accessToken.split(" ")[1];
        } else {
            throw new AuthException(httpStatus.FORBIDDEN, "Invalid token format!");
        }
        const decoded = await promisify(jwt.verify)(
            accessToken,
            secrets.API_SECRET
        );
        req.authUser = decoded.authUser;
        return next();
    } catch (err) {
        console.error(err.message);
        return res.status(err.status).json({
            status: err.status ? err.status : httpStatus.INTERNAL_SERVER_ERROR,
            message: err.message
        });
    }
}