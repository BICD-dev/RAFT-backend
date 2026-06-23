import { Entity, Column, ManyToOne, JoinColumn } from "typeorm";
import { BaseClass } from "./BaseClass";
import { Class } from "./Class";

@Entity()
export class AttendanceLink extends BaseClass {
    @Column({ nullable: true })
    url?: string;

    @Column({ default: true })
    isActive!: boolean;

    // ── Relations 
    @Column()
    class_id!: string;

    @ManyToOne(() => Class, (cls) => cls.attendanceLinks)
    @JoinColumn({ name: "class_id" })
    class!: Class;
}