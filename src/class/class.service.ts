import { Class } from "../entities/Class.entity";
import { ClassRepository } from "../repositories/class.repository";
import { CourseRepository } from "../repositories/course.repository";
import { BadRequestException } from "../utils/exceptions/bad-request.exception";
import { NotFoundException } from "../utils/exceptions/not-found.exception";
import { UnauthorizedException } from "../utils/exceptions/unauthorized.exception";
import { CreateClassDto } from "./dtos/createClass.dto";
import { UpdateClassDto } from "./dtos/updateClass.dto";
import { IClassService } from "./interface/class.service.interface";

export class ClassService implements IClassService {
    private readonly classRepository: ClassRepository;
    private readonly courseRepository: CourseRepository;
    constructor() {
        this.classRepository = new ClassRepository();
        this.courseRepository = new CourseRepository();
    }
    
    // a lecturer creates a class for his course
    async createClassForCourse(lecturerId: string, data:CreateClassDto): Promise<Class> {
        const { courseId, startTime, endTime, recurring } = data;
        // Check if the lecturer is authorized to create a class for the given course
        const validCourse = await this.courseRepository.findById(courseId);
        if (!validCourse ) {
            throw new NotFoundException(`Course with id ${courseId} not found`); 
        } 
        if ( validCourse.lecturer_id !== lecturerId) {
            throw new UnauthorizedException("Unauthorized: You are not the lecturer of this course"); 
        }
        // validate the dates
        if (startTime >= endTime) {
            throw new BadRequestException("Invalid time range: startTime must be before endTime");
        }
        // Create the class
        return await this.classRepository.create({
            courseId,
            startTime,
            endTime,
            recurring
        });
    }

    async updateClassDetails(lecturerId: string, classId: string, data: UpdateClassDto): Promise<Class> {
        const { startTime, endTime, recurring } = data;
        // Check if the class exists
        const existingClass = await this.classRepository.findById(classId);
        if (!existingClass) {
            throw new NotFoundException(`Class with id ${classId} not found`);
        }
        // Check if the lecturer is authorized to update the class
        const course = await this.courseRepository.findById(existingClass.course_id);
        if (!course) {
            throw new NotFoundException(`Course with id ${existingClass.course_id} not found`);
        }
        if (course.lecturer_id !== lecturerId) {
            throw new UnauthorizedException("Unauthorized: You are not the lecturer of this course");
        }
        // validate the dates
        if (startTime >= endTime) {
            throw new BadRequestException("Invalid time range: startTime must be before endTime");
        }
        // Update the class
        const updatedClass = await this.classRepository.update(classId, {
            start_time: startTime,
            end_time: endTime,
            recurring
        });
        if (!updatedClass) {
            throw new NotFoundException(`Class with id ${classId} not found after update attempt`);
        }
        return updatedClass;
    }

    async getAllClassesForCourse(lecturerId: string, courseId: string): Promise<Class[]> {
        // Check if the lecturer is authorized to view classes for the given course
        const validCourse = await this.courseRepository.findById(courseId);
        if (!validCourse) {
            throw new NotFoundException(`Course with id ${courseId} not found`);
        }
        if (validCourse.lecturer_id !== lecturerId) {
            throw new UnauthorizedException("Unauthorized: You are not the lecturer of this course");
        }
        // Retrieve all classes for the course
        const classes = await this.classRepository.findCourseClasses(courseId);
        return classes || [];
    }

    async deleteClass(lecturerId: string, classId: string): Promise<void> {
        // Check if the class exists
        const existingClass = await this.classRepository.findById(classId);
        if (!existingClass) {
            throw new NotFoundException(`Class with id ${classId} not found`);
        }
        // Check if the lecturer is authorized to delete the class
        const course = await this.courseRepository.findById(existingClass.course_id);
        if (!course) {
            throw new NotFoundException(`Course with id ${existingClass.course_id} not found`);
        }
        if (course.lecturer_id !== lecturerId) {
            throw new UnauthorizedException("Unauthorized: You are not the lecturer of this course");
        }
        // Delete the class
        const deleted = await this.classRepository.delete(classId);
        if (!deleted) {
            throw new NotFoundException(`Class with id ${classId} could not be deleted`);
        }
    }

    async getClassById(lecturerId: string, classId: string): Promise<Class> {
        // Check if the class exists
        const existingClass = await this.classRepository.findById(classId);
        if (!existingClass) {
            throw new NotFoundException(`Class with id ${classId} not found`);
        }
        // Check if the lecturer is authorized to view the class
        const course = await this.courseRepository.findById(existingClass.course_id);
        if (!course) {
            throw new NotFoundException(`Course with id ${existingClass.course_id} not found`);
        }
        if (course.lecturer_id !== lecturerId) {
            throw new UnauthorizedException("Unauthorized: You are not the lecturer of this course");
        }
        return existingClass;
    }
}
