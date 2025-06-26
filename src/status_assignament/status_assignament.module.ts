import { Module } from '@nestjs/common';
import { StatusAssignamentService } from './status_assignament.service';
import { StatusAssignamentController } from './status_assignament.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { StatusAssignament, StatusAssignamentSchema } from './entities/status_assignament.entity';

@Module({
  controllers: [StatusAssignamentController],
  providers: [StatusAssignamentService],
  exports:[StatusAssignamentService],
  imports:[
    MongooseModule.forFeature([
      {
        name:StatusAssignament.name,
        schema:StatusAssignamentSchema,
      },
    ]),
  ],
})
export class StatusAssignamentModule {}
