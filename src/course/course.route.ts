import { Router } from "express";
import { CourseController } from "./course.controller";
import { authenticate } from "../utils/middleware/authentication.middleware";
import { validateDto } from "../utils/middleware/validation.middleware";
import { createCourseDto } from "./dtos/createCourse.dto";
import { updateCourseDto } from "./dtos/updateCourse.dto";

const router = Router();
const courseController = new CourseController();

router.post("/", authenticate, validateDto(createCourseDto), courseController.createCourse);
router.get("/", authenticate, courseController.findLecturerCourses); // This route will fetch all courses for the logged-in lecturer
router.get("/:id", authenticate, courseController.findCourseById);
router.put("/:id", authenticate, validateDto(updateCourseDto), courseController.updateCourseDetails);
router.delete("/:id", authenticate, courseController.deleteCourse);

export default router;