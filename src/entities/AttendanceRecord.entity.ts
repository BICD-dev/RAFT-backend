import { Column, ManyToOne, JoinColumn, Entity, Unique } from "typeorm";
import { BaseClass } from "./BaseClass.entity";
import { Student } from "./Student.entity";
import { ClassSession } from "./ClassSession.entity";
import { AttendanceLink } from "./AttendanceLink.entity";

@Entity()
@Unique(["student_id", "session_id"])
export class AttendanceRecord extends BaseClass {
    @Column()
    student_id!: string;

    @Column()
    session_id!: string;

    @Column({ nullable: true })
    attendance_link_id?: string;

    @Column({ default: false })
    isPresent!: boolean;

    @Column({ type: "timestamp", nullable: true })
    checkedInAt?: Date;        // null until isPresent flips true — when did it actually happen?

    @Column({ type: "float", nullable: true })
    confidenceScore?: number;  // facial match confidence, for disputes/audits

    @ManyToOne(() => ClassSession, (cls) => cls.attendanceRecords)
    @JoinColumn({ name: "session_id" })
    session!: ClassSession;

    @ManyToOne(() => Student, (student) => student.attendanceRecords)
    @JoinColumn({ name: "student_id" })
    student!: Student;

    @ManyToOne(() => AttendanceLink)
    @JoinColumn({ name: "attendance_link_id" })
    attendanceLink?: AttendanceLink;
}