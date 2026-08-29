import { HttpStatus } from '../../constants/http-status.enum';
import { BaseException } from './base.exception';
import { ErrorMessages } from '../../constants/error-messages.enum';

export class MethodNotAllowedException extends BaseException {
    constructor(message: string) {
        super(message);
        this.status = HttpStatus.METHOD_NOT_ALLOWED;
        this.reason = ErrorMessages.METHOD_NOT_ALLOWED;
    }
}
