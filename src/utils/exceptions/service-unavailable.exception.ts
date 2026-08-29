import { HttpStatus } from '../../constants/http-status.enum';
import { BaseException } from './base.exception';
import { ErrorMessages } from '../../constants/error-messages.enum';

export class ServiceUnavailableException extends BaseException {
    constructor(message: string) {
        super(message);
        this.status = HttpStatus.SERVICE_UNAVAILABLE;
        this.reason = ErrorMessages.SERVICE_UNAVAILABLE_ERROR;
    }
}
