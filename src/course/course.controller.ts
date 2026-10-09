import { NextFunction, Request, Response } from "express";
import { CourseService } from "./course.service";
import { ResponseDto } from "../dtos/response.dto";
import { HttpStatus } from "../constants/http-status.enum";
import { SuccessMessages } from "../constants/success-messages.enum";
import { ResponseStatus } from "../dtos/interfaces/response.interface";
import { BadRequestException } from "../utils/exceptions/bad-request.exception";

export class CourseController {
    private readonly courseService: CourseService;
    constructor () {
        this.courseService = new CourseService();
    }

    createCourse = async (req:Request, res:Response, next:NextFunction) => {
        try {
            const { name, description } = req.body;
            const lecturerId = req.user?.id;
            if (!lecturerId) {
                throw new BadRequestException("Lecturer ID is missing from the request");
            }
            const course = await this.courseService.createCourse({ name, description, lecturerId });
            const response = new ResponseDto(ResponseStatus.SUCCESS, SuccessMessages.COURSE_CREATED_SUCCESSFULLY,course)
            res.status(HttpStatus.CREATED).json(response);
        } catch (error) {
            next(error);
        }
    }

    findLecturerCourses = async (req:Request, res:Response, next:NextFunction) => {
        try {
            const lecturerId = req.user?.id;
            if (!lecturerId) {
                throw new BadRequestException("Lecturer ID is missing from the request");
            }
            const courses = await this.courseService.findLecturerCourses(lecturerId);
            const response = new ResponseDto(ResponseStatus.SUCCESS, SuccessMessages.COURSE_FETCHED_SUCCESSFULLY,courses)
            res.status(HttpStatus.OK).json(response);
        } catch (error) {
            next(error);
        }
    }

    findCourseById = async (req:Request, res:Response, next:NextFunction) => {
        try {
            const { id } = req.params;
            if (!id) {
                throw new BadRequestException("Course ID is missing from the request");
            }
            const course = await this.courseService.findCourseById(id as string);
            const response = new ResponseDto(ResponseStatus.SUCCESS, SuccessMessages.COURSE_FETCHED_SUCCESSFULLY,course)
            res.status(HttpStatus.OK).json(response);
        } catch (error) {
            next(error);
        }
    }

    updateCourseDetails = async (req:Request, res:Response, next:NextFunction) => {
        try {
            const { id } = req.params;
            const { name, description } = req.body;
            const lecturerId = req.user?.id;
            if (!lecturerId) {
                throw new BadRequestException("Lecturer ID is missing from the request");
            }
            const course = await this.courseService.updateCourseDetails({ courseId: id as string, name, description }, lecturerId);
            const response = new ResponseDto(ResponseStatus.SUCCESS, SuccessMessages.COURSE_UPDATED_SUCCESSFULLY,course)
            res.status(HttpStatus.OK).json(response);
        } catch (error) {
            next(error);
        }
    }

    deleteCourse = async (req:Request, res:Response, next:NextFunction) => {
        try {
            const { id } = req.params;
            const lecturerId = req.user?.id;
            if (!lecturerId) {
                throw new BadRequestException("Lecturer ID is missing from the request");
            }
            if (!id) {
                throw new BadRequestException("Course ID is missing from the request");
            }
            const deleted = await this.courseService.deleteCourse(id as string, lecturerId);
            const response = new ResponseDto(ResponseStatus.SUCCESS, SuccessMessages.COURSE_DELETED_SUCCESSFULLY,null)
            res.status(HttpStatus.OK).json(response);
        } catch (error) {
            next(error);
        }
    }



}