import { Entity, Column, PrimaryColumn, ManyToOne, JoinColumn } from "typeorm";
import { BaseClass } from "./BaseClass";
import { Class } from "./Class";
import { Student } from "./Student.entity";

@Entity()
export class ClassMember extends BaseClass {
    // ── Composite Primary Key ───────────────────────────────────
    @PrimaryColumn()
    class_id!: string;

    @PrimaryColumn()
    student_id!: string;

    // ── Fields ──────────────────────────────────────────────────
    @Column({ default: 0, type: "int" })
    attendance_count!: number;

    @Column({ default: true })
    isActive!: boolean;

    // ── Relations ───────────────────────────────────────────────
    @ManyToOne(() => Class, (cls) => cls.classMembers)
    @JoinColumn({ name: "class_id" })
    class!: Class;

    @ManyToOne(() => Student, (student) => student.classMembers)
    @JoinColumn({ name: "student_id" })
    student!: Student;
}