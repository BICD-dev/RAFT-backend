import { Entity, Column, PrimaryColumn, OneToMany, JoinColumn } from "typeorm";
import { BaseClass } from "./BaseClass";
import { ClassMember } from "./ClassMember";

@Entity()
export class Student extends BaseClass {
    //  Composite Primary Key 
    @PrimaryColumn()
    class_id!: string;

    @PrimaryColumn()
    member_id!: string;

    //  Fields 
    @Column()
    firstName!: string;

    @Column()
    lastName!: string;

    @Column({ unique: true })
    email!: string;

    // this actve status is seperate from the class members active status
    @Column({ default: true })
    isActive!: boolean;           

    // ── Relations 
    @OneToMany(() => ClassMember, (cm) => cm.student)
    classMembers!: ClassMember[];
}