import { IsDefined, IsEmail, IsString, MinLength } from "class-validator";

export class CreateAccountDto {
    @IsDefined  ({message:"First name is required"})
    @IsString({message:"First name must be a string"})
    firstName!: string;
    
    @IsDefined  ({message:"Last name is required"})
    @IsString({message:"Last name must be a string"})
    lastName!: string;

    @IsDefined  ({message:"Email is required"})
    @IsEmail({},{message:"Invalid email format"})
    email!: string;
    
    @IsDefined  ({message:"Password is required"})
    @IsString({message:"Password must be a string"})
    @MinLength(8, {message:"Password must be at least 8 characters long"})
    password!: string;
}