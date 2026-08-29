import { HttpStatus } from '../../constants/http-status.enum';
import { BaseException } from './base.exception';
import { ErrorMessages } from '../../constants/error-messages.enum';

export class ConflictException extends BaseException {
    constructor(message: string) {
        super(message);
        this.status = HttpStatus.CONFLICT;
        this.reason = ErrorMessages.CONFLICT_ERROR;
    }
}
