import { Type } from "class-transformer";
import { IsBoolean, IsDate, IsNotEmpty, IsOptional, IsString } from "class-validator";

export class CreateClassDto {
    @IsString({"message": "courseId must be a string"})
    @IsNotEmpty({"message": "courseId cannot be empty"})
    courseId!: string;

    @Type(() => Date)
    @IsDate({"message": "startTime must be a valid date"})
    startTime!: Date;

    @Type(() => Date)
    @IsDate({"message": "endTime must be a valid date"})
    endTime!: Date;

    @IsOptional()
    @IsBoolean({"message": "recurring must be a boolean"})
    @IsNotEmpty({"message": "recurring cannot be empty"})
    recurring?: boolean;
}