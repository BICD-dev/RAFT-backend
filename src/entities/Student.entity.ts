import { Entity, Unique, Column, ManyToOne, JoinColumn, OneToMany } from "typeorm";
import { BaseClass } from "./BaseClass.entity";
import { Course } from "./Course.entity";
import { AttendanceRecord } from "./AttendanceRecord.entity";

@Entity()
@Unique(["course_id", "member_id"])
@Unique(["course_id", "email"])

export class Student extends BaseClass {
    @Column()
    course_id!: string;

    @Column()
    member_id!: string;   // matric number, unique within the course

    @Column()
    email!: string;       // email, unique within the course

    @Column()
    firstName!: string;

    @Column()
    lastName!: string;

    @Column({ default: true })
    isActive!: boolean;

    @ManyToOne(() => Course, (course) => course.students)
    @JoinColumn({ name: "course_id" })
    course!: Course;

    @OneToMany(() => AttendanceRecord, (ar) => ar.student)
    attendanceRecords!: AttendanceRecord[];
}