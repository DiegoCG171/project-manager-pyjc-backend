import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { ProjectController } from './project.controller';
import { ProjectService } from './project.service';
import { Project, ProjectSchema } from './entities/project.entity';
import { LogModule } from 'src/log/log.module';

@Module({
  controllers: [ProjectController],
  providers: [ProjectService],
  exports: [ProjectService],
  imports: [
    MongooseModule.forFeature([
      {
        name: Project.name,
        schema: ProjectSchema,
      },
    ]),
    LogModule
  ],
})
export class ProjectModule {}
