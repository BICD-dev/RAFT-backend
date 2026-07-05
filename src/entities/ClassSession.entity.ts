import { Column, Entity, JoinColumn, ManyToOne, OneToMany } from "typeorm";
import { Class } from "./Class.entity";
import { AttendanceRecord } from "./AttendanceRecord.entity";
import { BaseClass } from "./BaseClass.entity";

@Entity()
export class ClassSession extends BaseClass {
    @Column()
    class_id!: string;

    @Column({ unique: true })
    code!: string;   // cuid, generated at session creation in the service layer; overwritten on regeneration

    @Column({ default: true })
    isActive!: boolean;

    @Column()
    date!: Date;

    // Overrides the parent Class's start_time for this specific occurrence —
    // used when a session is rescheduled or run at a different time than
    // its recurring template (e.g. a one-off make-up class). Null means
    // "use the Class's default start_time."
    @Column({ type: "timestamp", nullable: true })
    start_time_override?: Date;

    @Column({ type: "timestamp", nullable: true })
    end_time_override?: Date;

    // Relations
    @ManyToOne(() => Class, (cls) => cls.sessions)   // many sessions → one class
    @JoinColumn({ name: "class_id" })
    class!: Class;

    @OneToMany(() => AttendanceRecord, (record) => record.session)   // one session → many attendance records
    attendanceRecords!: AttendanceRecord[];
}