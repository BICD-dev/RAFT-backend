 import { IsDefined, IsEmail, IsString } from "class-validator"

export class LoginDto {
    @IsDefined({message:"Email is required"})
    @IsEmail({},{message:"Invalid email format"})
    email!: string;

    @IsDefined({message:"Password is required"})
    @IsString({message:"Password must be a string"})
    password!: string
}