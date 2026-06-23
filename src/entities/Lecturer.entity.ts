import { Entity, Column, OneToMany } from "typeorm";
import { BaseClass } from "./BaseClass";
import { Class } from "./Class";

@Entity()
export class Lecturer  extends BaseClass {
    @Column()
    firstName!: string;

    @Column()
    lastName!: string;

    @Column({ unique: true })
    email!: string;

    @Column()
    password!:string;

    @OneToMany(() => Class, (cls) => cls.lecturer)
    classes!: Class[];
}
