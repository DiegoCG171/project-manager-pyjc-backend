import { Module } from '@nestjs/common';
import { ProviderService } from './provider.service';
import { ProviderController } from './provider.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { Provider, ProviderSchema } from './entities/provider.entity';

@Module({
  controllers: [ProviderController],
  providers: [ProviderService],
  imports:[
      MongooseModule.forFeature([
        {
          name:Provider.name,
          schema:ProviderSchema
        }
      ])
    ]
})
export class ProviderModule {}
