import { Request, Response, NextFunction } from "express";
import { AuthService } from "./auth.service";
import { ResponseDto } from "../dtos/response.dto";
import { ResponseStatus } from "../dtos/interfaces/response.interface";
import { SuccessMessages } from "../constants/success-messages.enum";
import { HttpStatus } from "../constants/http-status.enum";

export class AuthController {
    private readonly authService: AuthService;

    constructor() {
        this.authService = new AuthService();
    }

    register = async (req: Request, res: Response, next: NextFunction) => {
        try {
            const result = await this.authService.register(req.body);
            const response = new ResponseDto(
                ResponseStatus.SUCCESS,
                SuccessMessages.USER_REGISTERED_SUCCESSFULLY,
                result
            );
            res.status(HttpStatus.CREATED).json(response);
        } catch (error) {
            next(error);
        }
    };

    login = async (req: Request, res: Response, next: NextFunction) => {
        try {
            const result = await this.authService.login(req.body);
            const response = new ResponseDto(
                ResponseStatus.SUCCESS,
                SuccessMessages.USER_LOGGED_IN_SUCCESSFULLY,
                result
            );
            res.status(HttpStatus.OK).json(response);
        } catch (error) {
            next(error);
        }
    };
}
