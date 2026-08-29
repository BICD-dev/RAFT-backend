import { HttpStatus } from '../../constants/http-status.enum';
import { BaseException } from './base.exception';
import { ErrorMessages } from '../../constants/error-messages.enum';

export class NotImplementedException extends BaseException {
    constructor(message: string) {
        super(message);
        this.status = HttpStatus.NOT_IMPLEMENTED;
        this.reason = ErrorMessages.NOT_IMPLEMENTED_ERROR;
    }
}
