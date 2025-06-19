import { Module } from '@nestjs/common';
import { AssignamentsService } from './assignaments.service';
import { AssignamentsController } from './assignaments.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { Assignament, AssignamentSchema } from './entities/assignament.entity';
import { ProjectModule } from 'src/project/project.module';
import { UserModule } from 'src/user/user.module';
import { StatusAssignamentModule } from 'src/status_assignament/status_assignament.module';
import { PlataformModule } from 'src/plataform/plataform.module';

@Module({
  controllers: [AssignamentsController],
  providers: [AssignamentsService],
  exports:[AssignamentsService],
   imports: [
      MongooseModule.forFeature([
        {
          name: Assignament.name,
          schema: AssignamentSchema
        }
      ]),
      ProjectModule,
      UserModule,
      StatusAssignamentModule,
      PlataformModule
    ],
})
export class AssignamentsModule {}
