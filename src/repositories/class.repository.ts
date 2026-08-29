import { Repository } from "typeorm";
import { Class } from "../entities/Class.entity";
import { AppDataSource } from "../data-source";

export class ClassRepository {
    private readonly class: Repository<Class>;
    
    constructor() {
        this.class = AppDataSource.getRepository(Class);
    }
    
    // create class
    async create(data: {
        courseId: string;
        startTime: Date;
        endTime: Date;
        recurring?: boolean;
    }): Promise<Class> {
        const newClass = this.class.create({
            course_id: data.courseId,
            start_time: data.startTime,
            end_time: data.endTime,
            recurring: data.recurring ?? false,
        });
        return this.class.save(newClass);
    }

    // get class by id
    async findById(id: string): Promise<Class | null> {
        return this.class.findOne({ where: { id } });
    }

    // get all classes for a course
    async findCourseClasses(courseId: string): Promise<Class[] | null> {
        return this.class.find({ where: { course_id: courseId } });
    }
    
    // update class
    async update(id: string, data: Partial<Pick<Class, "start_time" | "end_time" | "recurring">>): Promise<Class | null> {
        const currentClass = await this.class.findOne({ where: { id } });
        if (!currentClass) {
            return null;
        }
        Object.assign(currentClass, data);
        return this.class.save(currentClass);
    }
    
    // delete class
    async delete(id: string): Promise<boolean> {
        const result = await this.class.softDelete(id);
        return result.affected !== undefined && result.affected > 0;
    }
}