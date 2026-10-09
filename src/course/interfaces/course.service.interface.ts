import { Course } from "../../entities/Course.entity";
import { createCourseDto } from "../dtos/createCourse.dto";
import { updateCourseDto } from "../dtos/updateCourse.dto";


export interface ICourseService {
    createCourse(data:createCourseDto): Promise<any>;
    // findAllCourses(): Promise<any[]>; // this fetches all courses tied to the logged in lecturer
    findCourseById(courseId: string): Promise<Course>;
    findLecturerCourses(lecturerId: string): Promise<Course[] | null>;
    updateCourseDetails(data: updateCourseDto, lecturerId:string): Promise<Course | null>;
    deleteCourse(courseId: string, lecturerId:string): Promise<boolean>;
}