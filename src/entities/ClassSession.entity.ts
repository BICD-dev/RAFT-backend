import { Column, Entity, JoinColumn, ManyToOne, OneToMany } from "typeorm";
import { Class } from "./Class.entity";
import { AttendanceLink } from "./AttendanceLink.entity";
import { AttendanceRecord } from "./AttendanceRecord.entity";
import { BaseClass } from "./BaseClass.entity";

@Entity()
export class ClassSession extends BaseClass {
    @Column()
    class_id!: string;

    @Column()
    date!: Date;


    @Column({ type: "timestamp", nullable: true })
    start_time_override?: Date;

    @Column({ type: "timestamp", nullable: true })
    end_time_override?: Date;
    
    // Relations
    @ManyToOne(() => Class, (cls) => cls.sessions)   // many sessions → one class
    @JoinColumn({ name: "class_id" })
    class!: Class;

    @OneToMany(() => AttendanceLink, (link) => link.session)   // one session → many attendance links
    attendanceLinks!: AttendanceLink[];

@OneToMany(()=> AttendanceRecord, (record) => record.session)   // one session → many attendance records
    attendanceRecords!: AttendanceRecord[];
}