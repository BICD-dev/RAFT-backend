import { Repository } from "typeorm";
import { AppDataSource } from "../data-source";
import { StudentFace } from "../entities/StudentFace.entity";

export class StudentFaceRepository {
    private readonly studentFace: Repository<StudentFace>;

    constructor() {
        this.studentFace = AppDataSource.getRepository(StudentFace);
    }

    // create student face reference
    async create(data: {
        student_id: string;
        embedding: number[];
        pictureUrl: string;
        provider: string;
    }): Promise<StudentFace> {
        const studentFace = this.studentFace.create({
            student_id: data.student_id,
            embedding: data.embedding,
            pictureUrl: data.pictureUrl,
            provider: data.provider,
        });
        return this.studentFace.save(studentFace);
    }

    // get student face reference by id
    async findById(id: string): Promise<StudentFace | null> {
        return this.studentFace.findOne({ where: { id } });
    }

    // get student face reference by student and provider
    async findByStudentAndProvider(studentId: string, provider: string): Promise<StudentFace | null> {
        return this.studentFace.findOne({ where: { student_id: studentId, provider } });
    }

    // get all face references for a student (candidates to match against)
    async findAllByStudent(studentId: string): Promise<StudentFace[] | null> {
        return this.studentFace.find({ where: { student_id: studentId } });
    }

    // update student face reference
    async update(id: string, data: Partial<Pick<StudentFace, "embedding" | "pictureUrl" | "provider">>): Promise<StudentFace | null> {
        const studentFace = await this.studentFace.findOne({ where: { id } });
        if (!studentFace) {
            return null;
        }
        Object.assign(studentFace, data);
        return this.studentFace.save(studentFace);
    }

    // delete student face reference
    async delete(id: string): Promise<boolean> {
        const result = await this.studentFace.softDelete(id);
        return result.affected !== undefined && result.affected > 0;
    }
}
