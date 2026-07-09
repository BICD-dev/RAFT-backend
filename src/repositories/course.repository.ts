import { Repository } from "typeorm";
import { Course } from "../entities/Course.entity";
import { AppDataSource } from "../data-source";

export class CourseRepository {
    private readonly course: Repository<Course>;

    constructor() {
        this.course = AppDataSource.getRepository(Course);
    }

    // create course
    async create(data: {
        name: string;
        description?:string;
        lecturerId: string;
    }): Promise<Course> {
        const course = this.course.create({
            name: data.name,
            description: data.description,
            lecturer_id: data.lecturerId,
        });
        return this.course.save(course);
    }

    // get all courses for a lecturer
    async findLecturerCourses(lecturerId:string): Promise<Course[] | null> {
        return this.course.find({where: {lecturer_id: lecturerId}});
    }

    // get course by id
    async getById(id: string): Promise<Course | null> {
        return this.course.findOne({where: { id }});
    }

    // update course
    async update(id:string, data: Partial<Pick<Course, "name" | "description">>): Promise<Course | null> {
        const currentCourse = await this.course.findOne({where: { id }});
        if(!currentCourse){ 
            return null;
        }
        Object.assign(currentCourse, data);
        return this.course.save(currentCourse);
    }

    // delete course
    async delete(id: string): Promise<boolean> {
        const result = await this.course.softDelete(id);
        return result.affected !== undefined && result.affected > 0;
    }
}