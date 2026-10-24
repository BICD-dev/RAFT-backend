import { Student } from "../entities/Student.entity";
import { CourseRepository } from "../repositories/course.repository";
import { StudentRepository } from "../repositories/student.repository";
import { ConflictException } from "../utils/exceptions/conflict.exception";
import { NotFoundException } from "../utils/exceptions/not-found.exception";
import { UnauthorizedException } from "../utils/exceptions/unauthorized.exception";
import { CreateStudentDto } from "./dtos/createStudent.dto";
import { UpdateStudentDto } from "./dtos/updateStudent.dto";
import { IStudentService } from "./interfaces/student.service.interface";

export class StudentService implements IStudentService {
    private readonly studentRepository: StudentRepository;
    private readonly courseRepository: CourseRepository;

    constructor() {
        this.studentRepository = new StudentRepository();
        this.courseRepository = new CourseRepository();
    }

    async createStudentForCourse(lecturerId: string, data: CreateStudentDto): Promise<Student> {
        const { courseId, memberId, email, firstName, lastName } = data;

        await this.assertLecturerOwnsCourse(lecturerId, courseId);

        // member id and email must be unique within the course
        const existingMember = await this.studentRepository.findByCourseMemberId(courseId, memberId);
        if (existingMember) {
            throw new ConflictException(`A student with member id ${memberId} is already enrolled in this course`);
        }
        const existingEmail = await this.studentRepository.findByCourseEmail(courseId, email);
        if (existingEmail) {
            throw new ConflictException(`A student with email ${email} is already enrolled in this course`);
        }

        return this.studentRepository.create({ courseId, memberId, email, firstName, lastName });
    }

    async getAllStudentsForCourse(lecturerId: string, courseId: string): Promise<Student[]> {
        await this.assertLecturerOwnsCourse(lecturerId, courseId);
        const students = await this.studentRepository.findCourseStudents(courseId);
        return students ?? [];
    }

    async getStudentById(lecturerId: string, studentId: string): Promise<Student> {
        const student = await this.studentRepository.findById(studentId);
        if (!student) {
            throw new NotFoundException(`Student with id ${studentId} not found`);
        }
        await this.assertLecturerOwnsCourse(lecturerId, student.course_id);
        return student;
    }

    async updateStudentById(lecturerId: string, studentId: string, data: UpdateStudentDto): Promise<Student> {
        const student = await this.studentRepository.findById(studentId);
        if (!student) {
            throw new NotFoundException(`Student with id ${studentId} not found`);
        }
        await this.assertLecturerOwnsCourse(lecturerId, student.course_id);

        // when changing member id or email, guard against duplicates within the course
        if (data.memberId && data.memberId !== student.member_id) {
            const existingMember = await this.studentRepository.findByCourseMemberId(student.course_id, data.memberId);
            if (existingMember) {
                throw new ConflictException(`A student with member id ${data.memberId} is already enrolled in this course`);
            }
        }
        if (data.email && data.email !== student.email) {
            const existingEmail = await this.studentRepository.findByCourseEmail(student.course_id, data.email);
            if (existingEmail) {
                throw new ConflictException(`A student with email ${data.email} is already enrolled in this course`);
            }
        }

        // map the camelCase dto onto the snake_case student columns
        const updatePayload: Partial<Pick<Student, "member_id" | "email" | "firstName" | "lastName">> = {};
        if (data.memberId !== undefined) updatePayload.member_id = data.memberId;
        if (data.email !== undefined) updatePayload.email = data.email;
        if (data.firstName !== undefined) updatePayload.firstName = data.firstName;
        if (data.lastName !== undefined) updatePayload.lastName = data.lastName;

        const updatedStudent = await this.studentRepository.update(studentId, updatePayload);
        if (!updatedStudent) {
            throw new NotFoundException(`Student with id ${studentId} could not be updated`);
        }
        return updatedStudent;
    }

    // a lecturer removes a student by id
    async deleteStudentById(lecturerId: string, studentId: string): Promise<void> {
        const student = await this.studentRepository.findById(studentId);
        if (!student) {
            throw new NotFoundException(`Student with id ${studentId} not found`);
        }
        await this.assertLecturerOwnsCourse(lecturerId, student.course_id);

        const deleted = await this.studentRepository.delete(studentId);
        if (!deleted) {
            throw new NotFoundException(`Student with id ${studentId} could not be deleted`);
        }
    }

    private async assertLecturerOwnsCourse(lecturerId: string, courseId: string): Promise<void> {
        const course = await this.courseRepository.findById(courseId);
        if (!course) {
            throw new NotFoundException(`Course with id ${courseId} not found`);
        }
        if (course.lecturer_id !== lecturerId) {
            throw new UnauthorizedException("Unauthorized: You are not the lecturer of this course");
        }
    }
}
