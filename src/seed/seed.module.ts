import { Module } from '@nestjs/common';
import { SeedService } from './seed.service';
import { SeedController } from './seed.controller';
import { AuthModule } from 'src/auth/auth.module';
import { MongooseModule } from '@nestjs/mongoose';
import { User, UserSchema } from 'src/user/entities/user.entity';
import { AreaModule } from 'src/area/area.module';
import { AreaService } from 'src/area/area.service';
import { Area, AreaSchema } from 'src/area/entities/area.entity';
import { Assignament, AssignamentSchema } from 'src/assignaments/entities/assignament.entity';
import { Project, ProjectSchema } from 'src/project/entities/project.entity';

@Module({
  controllers: [SeedController],
  providers: [SeedService],
  imports: [
    AuthModule,
    MongooseModule.forFeature([
      {
        name: User.name,
        schema: UserSchema
      },
      {
        name: Area.name,
        schema: AreaSchema
      },
      {
        name: Assignament.name,
        schema: AssignamentSchema
      },
      {
        name: Project.name,
        schema: ProjectSchema
      }
    ])
  ]
})
export class SeedModule {}
