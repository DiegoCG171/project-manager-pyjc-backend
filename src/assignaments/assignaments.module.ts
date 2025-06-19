import { Module } from '@nestjs/common';
import { AssignamentsService } from './assignaments.service';
import { AssignamentsController } from './assignaments.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { Assignament, AssignamentSchema } from './entities/assignament.entity';

@Module({
  controllers: [AssignamentsController],
  providers: [AssignamentsService],
   imports: [
      MongooseModule.forFeature([
        {
          name: Assignament.name,
          schema: AssignamentSchema
        }
      ]),
    ],
})
export class AssignamentsModule {}
