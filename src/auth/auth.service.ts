import { IAuthService, AuthResult } from "./interfaces/auth.service.interface";
import { CreateAccountDto } from "./dtos/create-account.dto";
import { LoginDto } from "./dtos/login.dto";
import { LecturerRepository } from "../repositories/lecturer.repository";
import { BcryptService } from "../utils/bcrypt/bcrypt.service";
import { JwtService } from "../utils/jwt/jwt.service";
import { ConflictException } from "../utils/exceptions/conflict.exception";
import { UnauthorizedException } from "../utils/exceptions/unauthorized.exception";

export class AuthService implements IAuthService {
    private readonly lecturerRepository: LecturerRepository;
    private readonly bcryptService: BcryptService;
    private readonly jwtService: JwtService;

    constructor() {
        this.lecturerRepository = new LecturerRepository();
        this.bcryptService = new BcryptService();
        this.jwtService = new JwtService();
    }

    async register(userData: CreateAccountDto): Promise<AuthResult> {
        const existing = await this.lecturerRepository.findOne({ email: userData.email });
        if (existing) {
            throw new ConflictException("An account with this email already exists");
        }

        const hashedPassword = await this.bcryptService.hashPassword(userData.password);
        const lecturer = await this.lecturerRepository.create({
            firstName: userData.firstName,
            lastName: userData.lastName,
            email: userData.email,
            hashedPassword,
        });

        return this.buildAuthResult(lecturer);
    }

    async login(credentials: LoginDto): Promise<AuthResult> {
        const lecturer = await this.lecturerRepository.findOne({ email: credentials.email });
        if (!lecturer) {
            throw new UnauthorizedException("Invalid email or password");
        }

        const isPasswordValid = await this.bcryptService.comparePassword(credentials.password, lecturer.password);
        if (!isPasswordValid) {
            throw new UnauthorizedException("Invalid email or password");
        }

        return this.buildAuthResult(lecturer);
    }

    async forgotPassword(email: string): Promise<void> {
        // TODO: implement password reset in a future iteration
        return Promise.resolve();
    }

    private buildAuthResult(lecturer: {
        id: string;
        firstName: string;
        lastName: string;
        email: string;
    }): AuthResult {
        const token = this.jwtService.sign({
            id: lecturer.id,
            email: lecturer.email,
        });

        return {
            token,
            user: {
                id: lecturer.id,
                firstName: lecturer.firstName,
                lastName: lecturer.lastName,
                email: lecturer.email,
            },
        };
    }
}
