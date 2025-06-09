import { Injectable } from "@nestjs/common";
import { hash, compare } from 'bcrypt';

@Injectable()
export class HashService {
    async hashPassword(password: string): Promise<string> {
        return hash(password, 10);
    }

    async comparePassword(password: string, hash: string): Promise<boolean> {
        return compare(password, hash);
    }
}