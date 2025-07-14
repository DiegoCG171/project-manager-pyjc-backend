import { forwardRef, Module } from '@nestjs/common';
import { StatusProjectService } from './status_project.service';
import { StatusProjectController } from './status_project.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { StatusProject, StatusProyectSchema } from './entities/status_project.entity';
import { ProjectModule } from 'src/project/project.module';

@Module({
  controllers: [StatusProjectController],
  providers: [StatusProjectService],
  exports:[StatusProjectService],
  imports:[
    MongooseModule.forFeature([
          {
            name: StatusProject.name,
            schema: StatusProyectSchema,
          },
        ]),
        forwardRef(() =>ProjectModule)
  ]
})
export class StatusProjectModule {}
