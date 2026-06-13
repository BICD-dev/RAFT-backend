export interface IAuthService {
    register(userData: any): Promise<any>;
    login(credentials: any): Promise<any>;
    forgotPassword(email: string): Promise<void>;
}