import { Column, Entity, JoinColumn, ManyToOne, Unique } from "typeorm";
import { BaseClass } from "./BaseClass.entity";
import { Student } from "./Student.entity";

@Entity()
@Unique(["student_id", "provider"])

export class StudentFace extends BaseClass {
    @Column()
    student_id!: string;

    // The face descriptor (a fixed-length numeric vector) used by the
    // recognition engine for matching. face-api.js emits a Float32Array
    // (typically 128 dimensions); the Python lib may differ in size, so the
    // embedding length is not constrained to a fixed count.
    @Column({ type: "real", array: true })
    embedding!: number[];

    // Where the source/profile image lives (object storage URL or local path).
    // The DB stores the reference, not the raw bytes.
    @Column()
    pictureUrl!: string;

    // Which engine produced this embedding, e.g. "face-api.js" or "python".
    // Kept so embeddings can be re-rendered or compared correctly when the
    // recognition backend changes.
    @Column()
    provider!: string;

    // Relations
    @ManyToOne(() => Student, (student) => student.faces)
    @JoinColumn({ name: "student_id" })
    student!: Student;
}
