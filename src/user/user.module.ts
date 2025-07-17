import { Module } from '@nestjs/common';
import { UserService } from './user.service';
import { UserController } from './user.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { User, UserSchema } from './entities/user.entity';
<<<<<<< HEAD
=======
import { AuthModule } from 'src/auth/auth.module';
>>>>>>> d0ecd81679f054a592ada54fa031e2c2d17fb8b3

@Module({
  controllers: [UserController],
  providers: [UserService],
<<<<<<< HEAD
=======
  exports:[UserService],
>>>>>>> d0ecd81679f054a592ada54fa031e2c2d17fb8b3
  imports: [
    MongooseModule.forFeature([
      {
        name: User.name,
<<<<<<< HEAD
        schema:UserSchema
      }
    ])
=======
        schema: UserSchema,
      },
    ]),
    AuthModule,
>>>>>>> d0ecd81679f054a592ada54fa031e2c2d17fb8b3
  ],
})
export class UserModule {}
