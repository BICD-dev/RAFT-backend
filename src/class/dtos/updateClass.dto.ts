import { IsDefined, IsDate, IsNotEmpty, IsBoolean } from "class-validator";

export class UpdateClassDto {
    @IsDefined({"message": "startTime is required"})
    @IsDate({"message": "startTime must be a valid date"})
    @IsNotEmpty({"message": "startTime cannot be empty"})
    startTime!: Date;

    @IsDefined({"message": "endTime is required"})
    @IsDate({"message": "endTime must be a valid date"})
    @IsNotEmpty({"message": "endTime cannot be empty"})
    endTime!: Date;
    
    @IsNotEmpty({"message": "recurring cannot be empty"})
    @IsBoolean({"message": "recurring must be a boolean"})
    recurring?: boolean;
}