export interface IJwtService {
    sign(payload: object): string;
    verify<T>(token: string): T;
}

export default IJwtService;
