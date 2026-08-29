import { Repository } from "typeorm";
import { AppDataSource } from "../data-source";
import { Lecturer } from "../entities/Lecturer.entity";
// import { IRepository } from "./interface/IRepository";

export class LecturerRepository {
    private readonly lecturer: Repository<Lecturer>;

    constructor() {
        this.lecturer = AppDataSource.getRepository(Lecturer);
    }

    // create lecturer
    async create(data: {
        firstName: string;
        lastName: string;
        email: string;
        hashedPassword: string;
    }): Promise<Lecturer> {
        const lecturer = this.lecturer.create({
            firstName: data.firstName,
            lastName: data.lastName,
            email: data.email,
            password: data.hashedPassword,
        });
        return this.lecturer.save(lecturer);
    }

    // read lecturer
    async findById(id: string): Promise<Lecturer | null> {
        return this.lecturer.findOne({where: { id }});
    }
    
     // get lecturer by conditions
    async findOne(conditions: Partial<Pick<Lecturer, "email" | "firstName" | "lastName">>): Promise<Lecturer | null> {
        return this.lecturer.findOne({ where: conditions });
    }

    // update lecturer
    async update(id: string, data: Partial<Pick<Lecturer, "firstName" | "lastName" | "email">>): Promise<Lecturer | null> {
        const lecturer = await this.lecturer.findOne({where: { id }});
        if (!lecturer) {
            return null;
        }
        Object.assign(lecturer, data);
        return this.lecturer.save(lecturer);
    }

    // delete lecturer
    async delete(id: string): Promise<boolean> {
        const result = await this.lecturer.softDelete(id);
        return result.affected !== undefined && result.affected > 0;
    }

   
}