import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateAreaDto } from './dto/create-area.dto';
import { UpdateAreaDto } from './dto/update-area.dto';
import { InjectModel } from '@nestjs/mongoose';
import { Area } from './entities/area.entity';
import { Model } from 'mongoose';

@Injectable()
export class AreaService {
  constructor(
    @InjectModel(Area.name)
    private readonly areaModel: Model<Area>,
  ) {}

  async create(createAreaDto: CreateAreaDto) {
    try {
      const area = await this.areaModel.create(createAreaDto);
      return area;
    } catch (error) {
      throw error;
    }
  }

  async findAll() {
    try {
      const areas = await this.areaModel.find().exec();
      return areas;
    } catch (error) {
      throw error;
    }
  }

  async findOne(_id: string) {
    try {
      const area = await this.areaModel.findOne({ _id }).exec();
      if (!area) {
        throw new NotFoundException(`El area con id ${_id} no existe`);
      }
      return area;
    } catch (error) {
      throw error;
    }
  }

  async update(id: string, updateAreaDto: UpdateAreaDto) {
    try {
      const area = await this.findOne(id);
      Object.assign(area, updateAreaDto);
      return await this.areaModel.create(area);
    } catch (error) {
      console.error(error);
      throw error;
    }
  }

  async remove(_id: string) {
    try {
      const area = await this.findOne(_id);
      await this.areaModel.deleteOne({ _id: area._id });
      return { message: `El area con id ${area._id} se elimino correctamente` };
    } catch (error) {
      throw error;
    }
  }
}
