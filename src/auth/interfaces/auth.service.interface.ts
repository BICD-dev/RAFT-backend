import { CreateAccountDto } from "../dtos/create-account.dto";
import { LoginDto } from "../dtos/login.dto";

export interface AuthResult {
    token: string;
    user: {
        id: string;
        firstName: string;
        lastName: string;
        email: string;
    };
}

export interface IAuthService {
    register(userData: CreateAccountDto): Promise<AuthResult>;
    login(credentials: LoginDto): Promise<AuthResult>;
    forgotPassword(email: string): Promise<void>;
}
