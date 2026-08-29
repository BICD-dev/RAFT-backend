import jwt from "jsonwebtoken";
import IJwtService from "./jwt.service.interface";
import { config } from "../../config/config";

export class JwtService implements IJwtService {
    private readonly secret: string;
    private readonly expiresIn: string;

    constructor() {
        this.secret = config.jwt.secret;
        this.expiresIn = config.jwt.expiresIn;
    }

    sign(payload: object): string {
        return jwt.sign(payload, this.secret, { expiresIn: this.expiresIn as any });
    }

    verify<T>(token: string): T {
        return jwt.verify(token, this.secret) as T;
    }
}

export default JwtService;
