import bcrypt from 'bcrypt';
import IBcryptService from './bcrypt.service.interface';

export class BcryptService implements IBcryptService {
  private readonly saltRounds: number;
  
  constructor(saltRounds: number = 10) {
    this.saltRounds = saltRounds;
  }

  async hashPassword(password: string): Promise<string> {
    const salt = await bcrypt.hash(password, this.saltRounds);
    return salt;
  }

  async comparePassword(password: string, hashedPassword: string): Promise<boolean> {
    return bcrypt.compare(password, hashedPassword);
  }
}

export default BcryptService;