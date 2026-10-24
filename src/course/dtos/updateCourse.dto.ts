import { IsNotEmpty, IsOptional, IsString, MinLength } from "class-validator";

export class updateCourseDto {
    @IsOptional()
    @IsString({message:"Course name must be a string"})
    @MinLength(3, {message:"Course name must be at least 3 characters long"})
    @IsNotEmpty({message:"Course name cannot be empty"})
    name?: string;

    @IsOptional()
    @IsString({message:"Course description must be a string"})
    @IsNotEmpty({message:"Course description cannot be empty"})
    description?: string;
    
    @IsOptional()
    @IsString({message:"Course ID must be a string"})
    @IsNotEmpty({message:"Course ID cannot be empty"})
    courseId?: string;
}