import { Router } from "express";
import { authenticate } from "../utils/middleware/authentication.middleware";
import { ClassController } from "./class.controller";
import { validateDto } from "../utils/middleware/validation.middleware";
import { CreateClassDto } from "./dtos/createClass.dto";
import { UpdateClassDto } from "./dtos/updateClass.dto";

const router = Router();
const classController = new ClassController();

router.get("/", authenticate, classController.getAllClassesForCourse);
router.get("/:classId", authenticate, classController.getClassById);
router.post("/", authenticate, validateDto(CreateClassDto), classController.createClassForCourse);
router.put("/:classId", authenticate, validateDto(UpdateClassDto), classController.updateClassDetails);
router.delete("/:classId", authenticate, classController.deleteClass);

export default router;