import { HttpStatus } from "../constants/http-status.enum";
import { SuccessMessages } from "../constants/success-messages.enum";
import { ResponseStatus } from "../dtos/interfaces/response.interface";
import { ResponseDto } from "../dtos/response.dto";
import { UnauthorizedException } from "../utils/exceptions/unauthorized.exception";
import { ClassService } from "./class.service";
import { Request, Response, NextFunction } from "express";
export class ClassController {
    private readonly classService: ClassService;

    constructor() {
        this.classService = new ClassService();
    }

    createClassForCourse = async (req: Request, res: Response, next: NextFunction) => {
        try {
            const lecturerId = req.user?.id;
            if (!lecturerId) {
                throw new UnauthorizedException("Unauthorized: Lecturer ID not found in request");
            }
            const data = req.body;
            const newClass = await this.classService.createClassForCourse(lecturerId, data);
            const response = new ResponseDto(
                ResponseStatus.SUCCESS,
                SuccessMessages.CLASS_CREATED_SUCCESSFULLY,
                newClass
            );
            return res.status(HttpStatus.CREATED).json(response);
        } catch (error) {
            next(error);
        }
    };

    updateClassDetails = async (req: Request, res: Response, next: NextFunction) => {
        try {
            const lecturerId = req.user?.id;
            if (!lecturerId) {
                throw new UnauthorizedException("Unauthorized: Lecturer ID not found in request");
            }
            const classId = req.params.classId;
            const data = req.body;
            const updatedClass = await this.classService.updateClassDetails(lecturerId, classId as string, data);
            const response = new ResponseDto(
                ResponseStatus.SUCCESS,
                SuccessMessages.CLASS_UPDATED_SUCCESSFULLY,
                updatedClass
            );
            return res.status(HttpStatus.OK).json(response);
        } catch (error) {
            next(error);
        }
    };

    getAllClassesForCourse = async (req: Request, res: Response, next: NextFunction) => {
        try {
            const lecturerId = req.user?.id;
            if (!lecturerId) {
                throw new UnauthorizedException("Unauthorized: Lecturer ID not found in request");
            }
            const courseId = req.params.courseId;
            const classes = await this.classService.getAllClassesForCourse(lecturerId, courseId as string);
            const response = new ResponseDto(
                ResponseStatus.SUCCESS,
                SuccessMessages.CLASSES_RETRIEVED_SUCCESSFULLY,
                classes
            );
            return res.status(HttpStatus.OK).json(response);
        } catch (error) {
            next(error);
        }
    };
    
    deleteClass = async (req: Request, res: Response, next: NextFunction) => {
        try {
            const lecturerId = req.user?.id;
            if (!lecturerId) {
                throw new UnauthorizedException("Unauthorized: Lecturer ID not found in request");
            }
            const classId = req.params.classId;
            await this.classService.deleteClass(lecturerId, classId as string);
            const response = new ResponseDto(
                ResponseStatus.SUCCESS,
                SuccessMessages.CLASS_DELETED_SUCCESSFULLY
            );
            return res.status(HttpStatus.OK).json(response);
        } catch (error) {
            next(error);
        }
    };

    getClassById = async (req: Request, res: Response, next: NextFunction) => {
        try {
            const lecturerId = req.user?.id;
            if (!lecturerId) {
                throw new UnauthorizedException("Unauthorized: Lecturer ID not found in request");
            }
            const classId = req.params.classId;
            const classDetails = await this.classService.getClassById(lecturerId, classId as string);
            const response = new ResponseDto(
                ResponseStatus.SUCCESS,
                SuccessMessages.CLASS_FETCHED_SUCCESSFULLY,
                classDetails
            );
            return res.status(HttpStatus.OK).json(response);
        } catch (error) {
            next(error);
        }
    };
}