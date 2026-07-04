import path from "path";
import { DataSource } from "typeorm";
import dotenv from "dotenv";
dotenv.config();

export const AppDataSource = new DataSource({
    type: "postgres",
    host: process.env.DB_HOST,
    port: Number(process.env.DB_PORT),
    username: process.env.DB_USERNAME,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME,
    entities: [path.join(__dirname, "entities/*.entity{.ts,.js}")],
    migrations: [path.join(__dirname, "migrations/*{.ts,.js}")],
    synchronize: false,   // NEVER true in production — use migrations instead
    logging: true,
    ssl: process.env.DB_SSL === "true" ? { rejectUnauthorized: false } : false,
    migrationsRun: false, // or true if you want migrations to auto-run on boot
});