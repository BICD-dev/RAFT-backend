import { Router } from "express";
import { authenticate } from "../utils/middleware/authentication.middleware";
import { validateDto } from "../utils/middleware/validation.middleware";
import { CreateStudentDto } from "./dtos/createStudent.dto";
import { UpdateStudentDto } from "./dtos/updateStudent.dto";
import { StudentController } from "./student.controller";

const router = Router();
const studentController = new StudentController();

router.post("/", authenticate, validateDto(CreateStudentDto), studentController.createStudentForCourse);
router.get("/course/:courseId", authenticate, studentController.getAllStudentsForCourse);
router.get("/:id", authenticate, studentController.getStudentById);
router.put("/:id", authenticate, validateDto(UpdateStudentDto), studentController.updateStudentById);
router.delete("/:id", authenticate, studentController.deleteStudentById);

export default router;
