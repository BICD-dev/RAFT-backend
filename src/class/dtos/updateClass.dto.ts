import { Type } from "class-transformer";
import { IsDate, IsNotEmpty, IsOptional, IsBoolean } from "class-validator";

export class UpdateClassDto {
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