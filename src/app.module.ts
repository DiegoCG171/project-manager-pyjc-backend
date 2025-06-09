import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { MongooseModule, MongooseModuleOptions } from '@nestjs/mongoose';
import { AuthModule } from './auth/auth.module';
import { UserModule } from './user/user.module';
<<<<<<< HEAD
<<<<<<< HEAD
import { RolModule } from './rol/rol.module';
=======
=======
import { SeedModule } from './seed/seed.module';
>>>>>>> 5ba24cb3b2e270845fe49c99ddb0ef53f9e69f10
import { AreaModule } from './area/area.module';
>>>>>>> 4427f3fed7993584290ec30dafff2aaeab35e47e

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      envFilePath: '.env'
    }),
    MongooseModule.forRootAsync({
      imports: [ConfigModule],
      useFactory: async (
        configService: ConfigService
      ): Promise<MongooseModuleOptions> => ({
        uri: configService.get<string>('MONGO_INITDB_CONNECTION_URI'),
        user: configService.get<string>('MONGO_INITDB_ROOT_USERNAME'),
        pass: configService.get<string>('MONGO_INITDB_ROOT_PASSWORD'),
        dbName: configService.get<string>('MONGO_INITDB_NAME'),
      }),
      inject: [ConfigService]
    }),
    AuthModule,
    UserModule,
<<<<<<< HEAD
<<<<<<< HEAD
    RolModule
=======
=======
    SeedModule,
>>>>>>> 5ba24cb3b2e270845fe49c99ddb0ef53f9e69f10
    AreaModule
>>>>>>> 4427f3fed7993584290ec30dafff2aaeab35e47e
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
