import { Entity, Column, ManyToOne, JoinColumn } from "typeorm";
import { BaseClass } from "./BaseClass.entity";
import { ClassSession } from "./ClassSession.entity";

@Entity()
export class AttendanceLink extends BaseClass {
    @Column()
    url!: string;

    @Column({ default: true })
    isActive!: boolean;

    @Column()
    session_id!: string;

    // expiresAt is inherited from BaseClass and can be used to set the expiration time for the attendance link.

    // ── Relations ──────────────────────────────────────────────
    @ManyToOne(() => ClassSession, (cls) => cls.attendanceLinks)
    @JoinColumn({ name: "session_id" })
    session!: ClassSession;

}