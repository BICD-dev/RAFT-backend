import { Student } from "../../entities/Student.entity";
import { CreateStudentDto } from "../dtos/createStudent.dto";
import { UpdateStudentDto } from "../dtos/updateStudent.dto";

export interface IStudentService {
    createStudentForCourse(lecturerId: string, data: CreateStudentDto): Promise<Student>;
    getAllStudentsForCourse(lecturerId: string, courseId: string): Promise<Student[]>;
    getStudentById(lecturerId: string, studentId: string): Promise<Student>;
    updateStudentById(lecturerId: string, studentId: string, data: UpdateStudentDto): Promise<Student>;
    deleteStudentById(lecturerId: string, studentId: string): Promise<void>;
}
