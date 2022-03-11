import UserRepository from "../repository/UserRepository";
import * as httpStatus from "../../../config/constants/HttpStatus";

class UserService {

    async findById(req) {
        try {
            const { id } = req.params;
            this.validateRequestData(id);
            let user = UserRepository.findById(req.id);
            if (!user) {
                return httpStatus.NOT_FOUND;
            }
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
            let user = UserRepository.findByEmail(req.email);
            if (!user) {
                return httpStatus.NOT_FOUND;
            }
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
            throw new Error("User's data not informed!");
        }
    }

}

export default new UserService();