import { PrimaryGeneratedColumn, Column, DeleteDateColumn } from "typeorm";

export abstract class BaseClass {
    @PrimaryGeneratedColumn("uuid")
    id!: string;

    @Column({ type: "timestamp", default: () => "CURRENT_TIMESTAMP" })
    createdAt!: Date;

    @Column({ type: "timestamp", default: () => "CURRENT_TIMESTAMP", onUpdate: "CURRENT_TIMESTAMP" })
    updatedAt!: Date;

    @DeleteDateColumn()
    deletedAt?: Date;

    @Column({ type: "timestamp", nullable: true })
    expiresAt?: Date;
}