import { Repository } from "typeorm";
import { AppDataSource } from "../data-source";
import { ClassSession } from "../entities/ClassSession.entity";

export class ClassSessionRepository {
    private readonly classSession: Repository<ClassSession>;

    constructor() {
        this.classSession = AppDataSource.getRepository(ClassSession);
    }

    // create class session
    async create(data: {
        class_id: string;
        code: string;  
        date: Date;
        start_time_override?: Date;
        end_time_override?: Date;
    }): Promise<ClassSession> {
        const classSession = this.classSession.create({
            class_id: data.class_id,
            code: data.code,
            date: data.date,
            start_time_override: data.start_time_override,
            end_time_override: data.end_time_override,
        });
        return this.classSession.save(classSession);
    }

    findByCode(code: string): Promise<ClassSession | null> {
        return this.classSession.findOne({ where: { code } });
    }
    
    findById(id: string): Promise<ClassSession | null> {
        return this.classSession.findOne({ where: { id } });
    }

    // get all sessions for a class
    async findClassSessions(classId: string): Promise<ClassSession[] | null> {
        return this.classSession.find({ where: { class_id: classId } });
    }

    // update class session
    async update(id: string, data: Partial<Pick<ClassSession, "start_time_override" | "end_time_override" | "isActive">>): Promise<ClassSession | null> {
        const currentSession = await this.classSession.findOne({ where: { id } });
        if (!currentSession) {
            return null;
        }
        Object.assign(currentSession, data);
        return this.classSession.save(currentSession);
    }

    // delete class session
    async delete(id: string): Promise<boolean> {
        const result = await this.classSession.softDelete(id);
        return result.affected !== undefined && result.affected > 0;
    }
}
    