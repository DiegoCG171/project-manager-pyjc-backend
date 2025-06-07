import { Module } from '@nestjs/common';
import { RolService } from './rol.service';
import { RolController } from './rol.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { Rol, RolSchema } from './entities/rol.entity';

@Module({
  controllers: [RolController],
  providers: [RolService],
  imports: [
    MongooseModule.forFeature([
      {
        name: Rol.name,
        schema: RolSchema,
      },
    ]),
  ],
})
export class RolModule {}
