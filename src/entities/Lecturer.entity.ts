import { Entity, Column, OneToMany } from "typeorm";
import { BaseClass } from "./BaseClass.entity";
import { Course } from "./Course.entity";

@Entity()
export class Lecturer  extends BaseClass {
    @Column()
    firstName!: string;

    @Column()
    lastName!: string;

    @Column({ unique: true })
    email!: string;

    @Column()
    password!:string;

    @OneToMany(() => Course, (course) => course.lecturer)
    Courses!: Course[];
}
