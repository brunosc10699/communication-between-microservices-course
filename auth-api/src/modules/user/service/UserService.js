import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';

import * as httpStatus from '../../../config/constants/HttpStatus.js';
import * as secrets from '../../../config/constants/Secrets.js';
import UserException from '../Exceptions/UserException.js';
import UserRepository from '../repository/UserRepository.js';

class UserService {

    async getAccessToken(req) {
        try {
            const { email, password } = req.body;
            this.validateCredentials(email, password);
            let user = await UserRepository.findByEmail(email);
            this.validateUserNotFound(user);
            await this.validatePassword(password, user.password);
            const authUser = {
                id: user.id,
                name: user.name,
                email: user.email
            };
            const bearer = "bearer ";
            const accessToken = bearer + jwt.sign({authUser}, secrets.API_SECRET, {expiresIn: "1d"});
            return {
                status: httpStatus.OK,
                accessToken
            };
        } catch (err) {
            console.error(err.message);
            return {
                status: err.status ? err.status : httpStatus.INTERNAL_SERVER_ERROR,
                message: err.message
            };
        }
    }

    async findById(req) {
        try {
            const { id } = req.params;
            this.validateAuthenticatedUser(id, req);
            let user = await UserRepository.findById(id);
            this.validateUserNotFound(user);
            return {
                status: httpStatus.OK,
                user: {
                    id: user.id,
                    name: user.name,
                    email: user.email
                }
            };
        } catch (err) {
            console.error(err.message);
            return {
                status: err.status ? err.status : httpStatus.INTERNAL_SERVER_ERROR,
                message: err.message
            };
        }
    }

    async findByEmail(req) {
        try {
            const { email } = req.params;
            this.validateAuthenticatedUser(email, req);
            let user = await UserRepository.findByEmail(email);
            this.validateUserNotFound(user);
            return {
                status: httpStatus.OK,
                user: {
                    id: user.id,
                    name: user.name,
                    email: user.email
                }
            };
        } catch (err) {            
            console.error(err.message);
            return {
                status: err.status ? err.status : httpStatus.INTERNAL_SERVER_ERROR,
                message: err.message
            };
        }
    }

    validateAuthenticatedUser(userData, req) {
        if (userData != req.authUser.email) {
            throw new UserException(httpStatus.UNAUTHORIZED, "Unauthorized!");
        }
    }

    validateUserNotFound(user) {
        if (!user) {
            throw new UserException(httpStatus.NOT_FOUND, "User not found!");
        }
    }

    validateCredentials(email, password) {
        if (!email || !password) {
            throw new UserException(httpStatus.FORBIDDEN, "Enter your email and password!");
        }
    }

    async validatePassword(password, hashPassword) {
        if (!(await bcrypt.compare(password, hashPassword))) {
            throw new UserException(httpStatus.FORBIDDEN, "Password doesn't match!");
        }
    }

}

export default new UserService();