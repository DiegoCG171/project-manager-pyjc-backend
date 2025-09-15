import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { readFileSync } from 'fs';
import { Model } from 'mongoose';
import { join } from 'path';
import { AreaService } from 'src/area/area.service';
import { Area } from 'src/area/entities/area.entity';
import { AssignamentsService } from 'src/assignaments/assignaments.service';
import { Assignament } from 'src/assignaments/entities/assignament.entity';
import { HashService } from 'src/auth/hash.service';
import { Project } from 'src/project/entities/project.entity';
import { ProjectService } from 'src/project/project.service';
import { User } from 'src/user/entities/user.entity';

@Injectable()
export class SeedService {
    constructor(
        @InjectModel(User.name)
        private readonly userModel : Model<User>,
        private readonly hashService: HashService,
        @InjectModel(Area.name)
        private readonly areasModel : Model<Area>,
        @InjectModel(Project.name)
        private readonly projectModel : Model<Project>,
        @InjectModel(Assignament.name)
        private readonly assignamentModel : Model<Assignament>

    ) { }
    async excecuteSeed(): Promise<string> {
        try {
            await this.seedUsers();
            await this.seedGeneric<Area>(this.areasModel, 'areas.json', 'Áreas');
            await this.seedGeneric<Assignament>(this.assignamentModel, 'assignaments.json', 'Assignaments');
            await this.seedGeneric<Project>(this.projectModel, 'projects.json', 'Projects');

            return 'Seed ejecutado correctamente';
        } catch (error) {
            throw error;
        }
    }

    private async seedUsers() {
        const filePath = join('src', 'seed', 'data', 'users.json');
        const jsonData = readFileSync(filePath, 'utf-8');
        const users: Array<User> = JSON.parse(jsonData);

        for (const user of users) {
            user.password = await this.hashService.hashPassword(user.password);
        }

        await this.userModel.deleteMany({});
        await this.userModel.insertMany(users);
        console.log('Usuarios insertados');
    }

    private async seedGeneric<T>(model: Model<T>, fileName: string, label: string) {
        const filePath = join('src', 'seed', 'data', fileName);
        const jsonData = readFileSync(filePath, 'utf-8');
        const items: Array<T> = JSON.parse(jsonData);

        await model.deleteMany({});
        await model.insertMany(items);
        console.log(`${label} insertados`);
    }

}