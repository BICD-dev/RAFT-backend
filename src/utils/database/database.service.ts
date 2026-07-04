import { AppDataSource } from "../../data-source";

export class DatabaseService {
    async connect(): Promise<void> {
        try {
            await AppDataSource.initialize();
            console.log("Data Source has been initialized!");
        } catch (err) {
            console.error("Error during Data Source initialization:", err);
            throw err;
        }
    }

    async disconnect(): Promise<void> {
        try {
            await AppDataSource.destroy();
            console.log("Data Source has been destroyed!");
        } catch (err) {
            console.error("Error during Data Source destruction:", err);
            throw err;
        }
    }
}