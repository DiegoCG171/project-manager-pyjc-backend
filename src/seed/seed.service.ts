import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { readFileSync } from 'fs';
import { Model } from 'mongoose';
import { join } from 'path';
import { HashService } from 'src/auth/hash.service';
import { User } from 'src/user/entities/user.entity';

@Injectable()
export class SeedService {
    constructor(
        @InjectModel(User.name)
        private readonly userModel = Model<User>,
        private readonly hashService: HashService
    ){}
    async excecuteSeed(): Promise<string>{
        try{
            let filePath = join('src', 'seed', 'data', 'users.json');
            let jsonData = readFileSync(filePath, 'utf-8');
            const users: Array<User> = JSON.parse(jsonData);
            for(let user of users){
                user.password = await this.hashService.hashPassword(user.password)
            }
            await this.userModel.deleteMany({});
            await this.userModel.insertMany(users);
            console.log("Usuarios insertados");

            return "Seed ejecutado correctamente";
        }catch(error){
            throw error
        }
    }
}
