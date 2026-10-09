import { IsDefined, IsNotEmpty, IsString, MinLength } from "class-validator";

export class createCourseDto {
    @IsDefined({message:"Course name is required"})
    @IsString({message:"Course name must be a string"})
    @MinLength(3, {message:"Course name must be at least 3 characters long"})
    @IsNotEmpty({message:"Course name cannot be empty"})
    name!: string;

    @IsDefined({message:"Course description is required"})
    @IsString({message:"Course description must be a string"})
    @IsNotEmpty({message:"Course description cannot be empty"})
    description!: string;
    
    @IsDefined({message:"Lecturer ID is required"})
    @IsString({message:"Lecturer ID must be a string"})
    @IsNotEmpty({message:"Lecturer ID cannot be empty"})
    lecturerId!: string; // this will be set from the logged in lecturer's id, not from the request body
}