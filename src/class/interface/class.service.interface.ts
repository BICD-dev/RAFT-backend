import { Class } from "../../entities/Class.entity";
import { CreateClassDto } from "../dtos/createClass.dto";
import { UpdateClassDto } from "../dtos/updateClass.dto";

export interface IClassService {
    createClassForCourse(lecturerId: string, data: CreateClassDto): Promise<Class>;
    updateClassDetails(lecturerId: string, classId: string, data: UpdateClassDto): Promise<Class>;
    getAllClassesForCourse(lecturerId: string, courseId: string): Promise<Class[]>;
    deleteClass(lecturerId: string, classId: string): Promise<void>;
    getClassById(lecturerId: string, classId: string): Promise<Class>;
}