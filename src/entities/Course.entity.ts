import { Entity, Column, ManyToOne, OneToMany, JoinColumn, ManyToMany } from "typeorm";
import { BaseClass } from "./BaseClass.entity";
import { Lecturer } from "./Lecturer.entity";
import { Class } from "./Class.entity";
import { Student } from "./Student.entity";

@Entity()
export class Course extends BaseClass {
    @Column()
    name!: string;

    @Column({ nullable: true })
    description?: string;

    @Column()
    lecturer_id!: string;

    // ── Relations ───────────────────────────────────────────────

    @ManyToOne(() => Lecturer, (lecturer) => lecturer.Courses)   // many courses → one lecturer
    @JoinColumn({ name: "lecturer_id" })
    lecturer!: Lecturer;

    @OneToMany(() => Class, (cls) => cls.course)   // one course → many classes
    class!: Class[];

    @OneToMany(() => Student, (student) => student.course)   // one course → many students
    students!: Student[];
}