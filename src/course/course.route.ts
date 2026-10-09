import { Router } from "express";
import { CourseController } from "./course.controller";
import { authenticate } from "../utils/middleware/authentication.middleware";

const router = Router();
const courseController = new CourseController();

router.post("/", authenticate, courseController.createCourse);
router.get("/", authenticate, courseController.findLecturerCourses); // This route will fetch all courses for the logged-in lecturer
router.get("/:id", authenticate, courseController.findCourseById);
router.put("/:id", authenticate, courseController.updateCourseDetails);
router.delete("/:id", authenticate, courseController.deleteCourse);

export default router;