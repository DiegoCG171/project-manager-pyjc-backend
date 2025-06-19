import { Module } from '@nestjs/common';
import { RolService } from './rol.service';
import { RolController } from './rol.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { Rol, RolSchema } from './entities/rol.entity';
import { UserModule } from 'src/user/user.module';

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
    UserModule,
  ],
})
export class RolModule {}
/* 
  :)
*/
