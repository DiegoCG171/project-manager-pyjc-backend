import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { MongooseModule, MongooseModuleOptions } from '@nestjs/mongoose';
import { AuthModule } from './auth/auth.module';
import { UserModule } from './user/user.module';

import { RolModule } from './rol/rol.module';

import { SeedModule } from './seed/seed.module';

import { AreaModule } from './area/area.module';
import { MailSenderModule } from './mail-sender/mail-sender.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      envFilePath: '.env',
    }),
    MongooseModule.forRootAsync({
      imports: [ConfigModule],
      useFactory: async (
        configService: ConfigService,
      ): Promise<MongooseModuleOptions> => ({
        uri: configService.get<string>('MONGO_INITDB_CONNECTION_URI'),
        user: configService.get<string>('MONGO_INITDB_ROOT_USERNAME'),
        pass: configService.get<string>('MONGO_INITDB_ROOT_PASSWORD'),
        dbName: configService.get<string>('MONGO_INITDB_NAME'),
      }),
      inject: [ConfigService],
    }),
    AuthModule,
    UserModule,
    RolModule,
    SeedModule,
    AreaModule,
    MailSenderModule
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
