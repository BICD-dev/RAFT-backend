import { Course } from "../entities/Course.entity";
import { CourseRepository } from "../repositories/course.repository";
import { LecturerRepository } from "../repositories/lecturer.repository";
import { ConflictException } from "../utils/exceptions/conflict.exception";
import { NotFoundException } from "../utils/exceptions/not-found.exception";
import { UnauthorizedException } from "../utils/exceptions/unauthorized.exception";
import { createCourseDto } from "./dtos/createCourse.dto";
import { updateCourseDto } from "./dtos/updateCourse.dto";
import { ICourseService } from "./interfaces/course.service.interface";

export class CourseService implements ICourseService{
    private readonly courseRepository: CourseRepository;
    private readonly lecturerRepository: LecturerRepository;
    constructor () {
        this.courseRepository = new CourseRepository()
        this.lecturerRepository = new LecturerRepository()
    }

    async findLecturerCourses(lecturerId: string): Promise<Course[] | null> {
        // check that lecturer exists and then fetch courses for that lecturer
        const lecturer = await this.lecturerRepository.findById(lecturerId);
        if (!lecturer) {
            throw new UnauthorizedException("Lecturer does not exist");
        }
        const courses = await this.courseRepository.findLecturerCourses(lecturerId);
        return courses ?? [];
    }
    
    async findCourseById(courseId: string): Promise<Course> {
        // check that the course exists and then return the course details
        const course = await this.courseRepository.findById(courseId);
        if (!course) {
            throw new NotFoundException("Course does not exist");
        }
        return course;
    }
    
    async updateCourseDetails(data: updateCourseDto, lecturerId: string): Promise<Course | null> {
        const { courseId, name, description } = data;
        // check that the course exists and then update the course details
        const course = await this.courseRepository.findById(courseId);
        if (!course) {
            throw new NotFoundException("Course does not exist");
        }
        // ownership check for the lecturer
        const lecturer = await this.lecturerRepository.findById(course.lecturer_id);
        if (!lecturer || lecturer.id !== lecturerId) {
            throw new UnauthorizedException("You are not the owner of this course");
        }

        const updatedCourse = await this.courseRepository.update(courseId, { name, description });
        return updatedCourse;
    }

    async deleteCourse(courseId: string, lecturerId:string): Promise<boolean> {
        // check that the course exists and then update the course details
        const course = await this.courseRepository.findById(courseId);
        if (!course) {
            throw new NotFoundException("Course does not exist");
        }
        // ownership check for the lecturer
        const lecturer = await this.lecturerRepository.findById(course.lecturer_id);
        if (!lecturer || lecturer.id !== lecturerId) {
            throw new UnauthorizedException("You are not the owner of this course");
        }

        const deleted = await this.courseRepository.delete(courseId);
        if (!deleted) {
            throw new NotFoundException("Course could not be deleted");
        }
        return deleted;
    }

    async createCourse(data: createCourseDto): Promise<any> {
        
        // check that the lecturer exists
        const lecturerExists = await this.lecturerRepository.findById(data.lecturerId);
        if(!lecturerExists){
            throw new UnauthorizedException("Lecturer does not exist");
        }
        // check if the course with the same name already exists for this lecturer
        const existingCourses = await this.courseRepository.findLecturerCourses(data.lecturerId);
        const courseExists = (existingCourses ?? []).some(course => course.name === data.name);
        if(courseExists){
            throw new ConflictException("Course with the same name already exists for this lecturer");
        }
        // create the course
        await this.courseRepository.create(data);
        return 
    }
}