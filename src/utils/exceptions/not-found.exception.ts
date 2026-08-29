import { HttpStatus } from '../../constants/http-status.enum';
import { BaseException } from './base.exception';
import { ErrorMessages } from '../../constants/error-messages.enum';

export class NotFoundException extends BaseException {
    constructor(message: string) {
        super(message);
        this.status = HttpStatus.NOT_FOUND;
        this.reason = ErrorMessages.RESOURCE_NOT_FOUND;
    }
}
