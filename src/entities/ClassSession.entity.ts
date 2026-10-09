import { Column, Entity, JoinColumn, ManyToOne, OneToMany } from "typeorm";
import { Class } from "./Class.entity";
import { AttendanceRecord } from "./AttendanceRecord.entity";
import { BaseClass } from "./BaseClass.entity";

@Entity()
export class ClassSession extends BaseClass {
    @Column()
    class_id!: string;

    @Column({ unique: true })// purpose of the code is so that the session can be easily identified and referenced in the system, especially when dealing with recurring sessions or when a session needs to be regenerated. It serves as a unique identifier for each session instance. different from the id field inherited from BaseClass, which is a UUID and serves as the primary key for the ClassSession entity in the database. The code field is more of a business logic identifier, while the id field is a technical identifier used by the database.
    code!: string;   // cuid, generated at session creation in the service layer; overwritten on regeneration

    @Column({ default: true })
    isActive!: boolean;

    @Column()
    date!: Date; // the date of the session, used to determine which session is currently active in the system

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