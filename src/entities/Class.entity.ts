import { Column, Entity, JoinColumn, ManyToOne, OneToMany } from "typeorm";
import { BaseClass } from "./BaseClass.entity";
import { Course } from "./Course.entity";
import { ClassSession } from "./ClassSession.entity";

@Entity()
export class Class extends BaseClass{
    @Column()
    course_id!:string;

    @Column()
    start_time!:Date;
    
    @Column()
    end_time!:Date;

    @Column({ default: false })
    recurring!:boolean;

    // Relations
    @ManyToOne(() => Course, (course) => course.class)   // many classes → one course
    @JoinColumn({ name: "course_id" })
    course!: Course;

    @OneToMany(() => ClassSession, (session) => session.class)   // one class → many sessions
    sessions!: ClassSession[];
}