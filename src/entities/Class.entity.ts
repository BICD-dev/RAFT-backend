import { Entity, Column, ManyToOne, OneToMany, JoinColumn } from "typeorm";
import { BaseClass } from "./BaseClass";
import { Lecturer } from "./Lecturer.entity";
import { ClassMember } from "./ClassMember";
import { AttendanceLink } from "./AttendanceLink";

@Entity()
export class Class extends BaseClass {
    @Column()
    name!: string;

    @Column({ nullable: true })
    description?: string;

    @Column({ default: 0 })
    classCount!: number;

    // ── Relations ───────────────────────────────────────────────
    @Column()
    lecturer_id!: string;

    @ManyToOne(() => Lecturer, (lecturer) => lecturer.classes)
    @JoinColumn({ name: "lecturer_id" })
    lecturer!: Lecturer;

    @OneToMany(() => ClassMember, (cm) => cm.class)   // one class → many junction rows
    classMembers!: ClassMember[];

    @OneToMany(() => AttendanceLink, (link) => link.class)
    attendanceLinks!: AttendanceLink[];
}