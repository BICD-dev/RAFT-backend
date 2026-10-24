import { NextFunction, Request, Response } from "express";
import { HttpStatus } from "../constants/http-status.enum";
import { SuccessMessages } from "../constants/success-messages.enum";
import { ResponseDto } from "../dtos/response.dto";
import { ResponseStatus } from "../dtos/interfaces/response.interface";
import { UnauthorizedException } from "../utils/exceptions/unauthorized.exception";
import { StudentService } from "./student.service";

export class StudentController {
    private readonly studentService: StudentService;

    constructor() {
        this.studentService = new StudentService();
    }

    createStudentForCourse = async (req: Request, res: Response, next: NextFunction) => {
        try {
            const lecturerId = req.user?.id;
            if (!lecturerId) {
                throw new UnauthorizedException("Unauthorized: Lecturer ID not found in request");
            }
            const student = await this.studentService.createStudentForCourse(lecturerId, req.body);
            const response = new ResponseDto(
                ResponseStatus.SUCCESS,
                SuccessMessages.STUDENT_ADDED_SUCCESSFULLY,
                student
            );
            return res.status(HttpStatus.CREATED).json(response);
        } catch (error) {
            next(error);
        }
    };

    getAllStudentsForCourse = async (req: Request, res: Response, next: NextFunction) => {
        try {
            const lecturerId = req.user?.id;
            if (!lecturerId) {
                throw new UnauthorizedException("Unauthorized: Lecturer ID not found in request");
            }
            const { courseId } = req.params;
            const students = await this.studentService.getAllStudentsForCourse(lecturerId, courseId as string);
            const response = new ResponseDto(
                ResponseStatus.SUCCESS,
                SuccessMessages.STUDENTS_RETRIEVED_SUCCESSFULLY,
                students
            );
            return res.status(HttpStatus.OK).json(response);
        } catch (error) {
            next(error);
        }
    };

    getStudentById = async (req: Request, res: Response, next: NextFunction) => {
        try {
            const lecturerId = req.user?.id;
            if (!lecturerId) {
                throw new UnauthorizedException("Unauthorized: Lecturer ID not found in request");
            }
            const { id } = req.params;
            const student = await this.studentService.getStudentById(lecturerId, id as string);
            const response = new ResponseDto(
                ResponseStatus.SUCCESS,
                SuccessMessages.STUDENT_FETCHED_SUCCESSFULLY,
                student
            );
            return res.status(HttpStatus.OK).json(response);
        } catch (error) {
            next(error);
        }
    };

    updateStudentById = async (req: Request, res: Response, next: NextFunction) => {
        try {
            const lecturerId = req.user?.id;
            if (!lecturerId) {
                throw new UnauthorizedException("Unauthorized: Lecturer ID not found in request");
            }
            const { id } = req.params;
            const student = await this.studentService.updateStudentById(lecturerId, id as string, req.body);
            const response = new ResponseDto(
                ResponseStatus.SUCCESS,
                SuccessMessages.STUDENT_UPDATED_SUCCESSFULLY,
                student
            );
            return res.status(HttpStatus.OK).json(response);
        } catch (error) {
            next(error);
        }
    };

    deleteStudentById = async (req: Request, res: Response, next: NextFunction) => {
        try {
            const lecturerId = req.user?.id;
            if (!lecturerId) {
                throw new UnauthorizedException("Unauthorized: Lecturer ID not found in request");
            }
            const { id } = req.params;
            await this.studentService.deleteStudentById(lecturerId, id as string);
            const response = new ResponseDto(
                ResponseStatus.SUCCESS,
                SuccessMessages.STUDENT_REMOVED_SUCCESSFULLY
            );
            return res.status(HttpStatus.OK).json(response);
        } catch (error) {
            next(error);
        }
    };
}
