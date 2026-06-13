import { HttpStatus } from "../../constants/http-status.enum";
import { BaseException } from "./base.exception";
import { ErrorMessages } from "../../constants/error-messages.enum";
export class UnauthorizedException extends BaseException {
    constructor(message: string) {
        super(message);
        this.status = HttpStatus.UNAUTHORIZED;
        this.reason = ErrorMessages.UNAUTHORIZED_ACCESS;
    }
}