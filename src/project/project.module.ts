import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { ProjectController } from './project.controller';
import { ProjectService } from './project.service';
import { Project, ProjectSchema } from './entities/project.entity';
import { AreaModule } from 'src/area/area.module';

@Module({
  controllers: [ProjectController],
  providers: [ProjectService],
  exports: [ProjectService],
  imports:[
    MongooseModule.forFeature([
      {
        name:Project.name,
        schema:ProjectSchema
      }
    ]),
    AreaModule
  ],
})
export class ProjectModule {}
