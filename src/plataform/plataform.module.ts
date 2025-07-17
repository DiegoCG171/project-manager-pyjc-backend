import { Module } from '@nestjs/common';
import { PlataformService } from './plataform.service';
import { PlataformController } from './plataform.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { Plataform, PlataformSchema } from './entities/plataform.entity';

@Module({
  controllers: [PlataformController],
  providers: [PlataformService],
  exports:[PlataformService],
  imports:[
      MongooseModule.forFeature([
        {
          name:Plataform.name,
          schema:PlataformSchema
        }
      ]),
    ],
})
export class PlataformModule {}
