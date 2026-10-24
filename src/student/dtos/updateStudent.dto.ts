import { IsEmail, IsNotEmpty, IsOptional, IsString } from "class-validator";

export class UpdateStudentDto {
    @IsOptional()
    @IsNotEmpty({ message: "memberId cannot be empty" })
    @IsString({ message: "memberId must be a string" })
    memberId?: string;

    @IsOptional()
    @IsEmail({}, { message: "Invalid email format" })
    email?: string;

    @IsOptional()
    @IsNotEmpty({ message: "firstName cannot be empty" })
    @IsString({ message: "firstName must be a string" })
    firstName?: string;

    @IsOptional()
    @IsNotEmpty({ message: "lastName cannot be empty" })
    @IsString({ message: "lastName must be a string" })
    lastName?: string;
}
