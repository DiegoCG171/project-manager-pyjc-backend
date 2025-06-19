import { Module } from '@nestjs/common';
import { AreaService } from './area.service';
import { AreaController } from './area.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { Area, AreaSchema } from './entities/area.entity';
import { CategoryModule } from 'src/category/category.module';

@Module({
  controllers: [AreaController],
  providers: [AreaService],
  imports: [
    MongooseModule.forFeature([
      {
        name: Area.name,
        schema: AreaSchema,
      },
    ]),
    //CategoryModule,
  ],
  exports: [CategoryModule],
})
export class AreaModule {}
