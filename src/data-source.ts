// src/config/database.ts
import { DataSource } from "typeorm";
import { Lecturer } from "./entities/Lecturer.entity";
import { Class } from "./entities/Class";
import { Student } from "./entities/Student.entity";
import { ClassMember } from "./entities/ClassMember";
import { AttendanceLink } from "./entities/AttendanceLink";

export const AppDataSource = new DataSource({
    type: "postgres",
    host: process.env.DB_HOST,
    port: Number(process.env.DB_PORT),
    username: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME,
    entities: [Lecturer, Class, Student, ClassMember, AttendanceLink],
    migrations: ["src/migrations/*.ts"],
    synchronize: false,   // NEVER true in production — use migrations instead
    logging: true,
});