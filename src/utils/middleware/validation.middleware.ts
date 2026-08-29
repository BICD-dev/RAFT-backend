import { Request, Response, NextFunction } from "express";
import { ClassConstructor, plainToInstance } from "class-transformer";
import { validate } from "class-validator";
import { BadRequestException } from "../exceptions/bad-request.exception";

export function validateDto<T extends object>(dtoClass: ClassConstructor<T>) {
    return async (req: Request, res: Response, next: NextFunction) => {
        try {
            const dto = plainToInstance(dtoClass, req.body);
            const errors = await validate(dto);
            if (errors.length > 0) {
                const messages = errors
                    .map((error) => Object.values(error.constraints || {}))
                    .flat()
                    .join(", ");
                throw new BadRequestException(messages);
            }
            req.body = dto;
            next();
        } catch (error) {
            next(error);
        }
    };
}
