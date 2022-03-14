import * as httpStatus from '../../../config/constants/HttpStatus.js';
import UserException from '../Exceptions/UserException.js';
import UserRepository from '../repository/UserRepository.js';

class UserService {

    async findById(req) {
        try {
            const { id } = req.params;
            this.validateRequestData(id);
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
            this.validateRequestData(email);
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

    validateRequestData(data) {
        if (!data) {
            throw new UserException(httpStatus.BAD_REQUEST, "User's data not informed!");
        }
    }

    validateUserNotFound(user) {
        if (!user) {
            throw new UserException(httpStatus.NOT_FOUND, "User not found!");
        }
    }

}

export default new UserService();