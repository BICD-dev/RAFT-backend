import { Request, Response, NextFunction } from "express";
import multer from "multer";
import { BadRequestException } from "../exceptions/bad-request.exception";

export const handleMulterError = (err: any, req: Request, res: Response, next: NextFunction) => {
    if (err instanceof multer.MulterError) {
        if (err.code === "LIMIT_FILE_SIZE") {
            throw new BadRequestException("File size too large. Maximum size is 5MB");
        }
        throw new BadRequestException(err.message);
    }
    if (err) {
        if (err.message.includes("Only image files")) {
            throw new BadRequestException(err.message);
        }
        next(err);
        return;
    }
    next();
};
