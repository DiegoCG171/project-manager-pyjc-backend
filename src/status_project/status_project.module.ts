import { Module } from '@nestjs/common';
import { StatusProjectService } from './status_project.service';
import { StatusProjectController } from './status_project.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { StatusProject, statusprojectSchema } from './entities/status_project.entity';

@Module({
  controllers: [StatusProjectController],
  providers: [StatusProjectService],
  imports: [
      MongooseModule.forFeature([
        {
          name: StatusProject.name,
          schema: statusprojectSchema,
        },
      ]),
    ],
})
export class StatusProjectModule {}
