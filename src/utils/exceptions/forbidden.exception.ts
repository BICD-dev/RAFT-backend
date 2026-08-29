import { HttpStatus } from '../../constants/http-status.enum';
import { BaseException } from './base.exception';
import { ErrorMessages } from '../../constants/error-messages.enum';

export class ForbiddenException extends BaseException {
    constructor(message: string) {
        super(message);
        this.status = HttpStatus.FORBIDDEN;
        this.reason = ErrorMessages.FORBIDDEN_ACCESS;
    }
}
