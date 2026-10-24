import { IsDefined, IsEmail, IsNotEmpty, IsString } from "class-validator";

export class CreateStudentDto {
    @IsDefined({ message: "courseId is required" })
    @IsNotEmpty({ message: "courseId cannot be empty" })
    @IsString({ message: "courseId must be a string" })
    courseId!: string;

    @IsDefined({ message: "memberId is required" })
    @IsNotEmpty({ message: "memberId cannot be empty" })
    @IsString({ message: "memberId must be a string" })
    memberId!: string; // matric number, unique within the course

    @IsDefined({ message: "email is required" })
    @IsEmail({}, { message: "Invalid email format" })
    email!: string; // unique within the course

    @IsDefined({ message: "firstName is required" })
    @IsNotEmpty({ message: "firstName cannot be empty" })
    @IsString({ message: "firstName must be a string" })
    firstName!: string;

    @IsDefined({ message: "lastName is required" })
    @IsNotEmpty({ message: "lastName cannot be empty" })
    @IsString({ message: "lastName must be a string" })
    lastName!: string;
}
