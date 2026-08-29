import { Repository } from "typeorm";
import { Student } from "../entities/Student.entity";
import { AppDataSource } from "../data-source";

export class StudentRepository {
    private readonly student: Repository<Student>;

    constructor() {
        this.student = AppDataSource.getRepository(Student);
    }

    // create student
    async create(data: {
        courseId: string;
        memberId: string;
        email: string;
        firstName: string;
        lastName: string;
        // pictureUrl?: string;
    }): Promise<Student> {
        const student = this.student.create({
            course_id: data.courseId,
            member_id: data.memberId,
            email: data.email,
            firstName: data.firstName,
            lastName: data.lastName,
            // pictureUrl: data.pictureUrl,
        });
        return this.student.save(student);
    }

    // get student by id
    async findById(id: string): Promise<Student | null> {
        return this.student.findOne({where: { id }});
    }

    // get student by conditions
    async findOne(conditions: Partial<Pick<Student, "email" | "firstName" | "lastName" | "member_id">>): Promise<Student | null> {
        return this.student.findOne({ where: conditions });
    }

    // update student
    async update(id: string, data: Partial<Pick<Student, "firstName" | "lastName" | "email" | "member_id">>): Promise<Student | null> {
        const student = await this.student.findOne({where: { id }});
        if (!student) {
            return null;
        }
        Object.assign(student, data);
        return this.student.save(student);
    }

    // delete student
    async delete(id: string): Promise<boolean> {
        const result = await this.student.softDelete(id);
        return result.affected !== undefined && result.affected > 0;
    }
}