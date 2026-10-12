import { Router } from "express";
import { authenticate } from "../utils/middleware/authentication.middleware";
import { ClassController } from "./class.controller";

const router = Router();
const classController = new ClassController();

router.get("/", authenticate, classController.getAllClassesForCourse);
router.get("/:classId", authenticate, classController.getClassById);
router.post("/", authenticate, classController.createClassForCourse);
router.put("/:classId", authenticate, classController.updateClassDetails);
router.delete("/:classId", authenticate, classController.deleteClass);

export default router;