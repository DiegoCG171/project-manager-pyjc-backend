import { Module } from '@nestjs/common';
import { ProyectoService } from './proyecto.service';
import { ProyectoController } from './proyecto.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { Proyecto, ProyectoSchema } from './entities/proyecto.entity';

@Module({
  controllers: [ProyectoController],
  providers: [ProyectoService],
  imports:[
    MongooseModule.forFeature([
      {
        name:Proyecto.name,
        schema:ProyectoSchema
      }
    ])
  ]
})
export class ProyectoModule {}
