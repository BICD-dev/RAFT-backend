import { Repository } from "typeorm";
import { AppDataSource } from "../data-source";
import { AttendanceRecord } from "../entities/AttendanceRecord.entity";

export class AttendanceRecordRepository {
    private readonly attendanceRecord: Repository<AttendanceRecord>;

    constructor() {
        this.attendanceRecord = AppDataSource.getRepository(AttendanceRecord);
    }
    
    // create attendance record
    async create(data: {
        student_id: string;
        session_id: string;
        checkedInAt: Date;
        confidenceScore?: number;
    }): Promise<AttendanceRecord> {
        const attendanceRecord = this.attendanceRecord.create({
            student_id: data.student_id,
            session_id: data.session_id,
            checkedInAt: data.checkedInAt,
            confidenceScore: data.confidenceScore,
        });
        return this.attendanceRecord.save(attendanceRecord);
    }

    // get attendance record by id
    async findById(id: string): Promise<AttendanceRecord | null> {
        return this.attendanceRecord.findOne({where: { id }});
    }

    // get attendance record by conditions
    async findOne(conditions: Partial<Pick<AttendanceRecord, "student_id" | "session_id">>): Promise<AttendanceRecord | null> {
        return this.attendanceRecord.findOne({ where: conditions });
    }

    // update attendance record
    async update(id: string, data: Partial<Pick<AttendanceRecord, "checkedInAt" | "confidenceScore">>): Promise<AttendanceRecord | null> {
        const attendanceRecord = await this.attendanceRecord.findOne({where: { id }});
        if (!attendanceRecord) {
            return null;
        }
        Object.assign(attendanceRecord, data);
        return this.attendanceRecord.save(attendanceRecord);
    }

    // i will keep this for the meantime, although i don't think it will be used, but just in case we need to delete an attendance record
    // delete attendance record
    async delete(id: string): Promise<boolean> {
        const result = await this.attendanceRecord.softDelete(id);
        return result.affected !== undefined && result.affected > 0;
    }

}