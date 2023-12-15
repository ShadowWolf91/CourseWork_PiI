"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class UserRequestError extends Error {
    constructor({ code, message, field, location, value }) {
        super(message);
        this.code = code;
        this.field = field;
        this.location = location;
        this.value = value;
    }
    static NotFound(message) {
        return new UserRequestError({ code: 404, message });
    }
    static BadRequest(message) {
        return new UserRequestError({ code: 400, message });
    }
    static UnprocessableEntity(error) {
        return new UserRequestError({ code: 422, ...error });
    }
    static Unauthorized() {
        return new UserRequestError({ code: 401, message: 'UNAUTHORIZED' });
    }
}
exports.default = UserRequestError;
//# sourceMappingURL=userRequestError.js.map