import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateAreaDto } from './dto/create-area.dto';
import { UpdateAreaDto } from './dto/update-area.dto';
import { InjectModel } from '@nestjs/mongoose';
import { Area } from './entities/area.entity';
import { Model } from 'mongoose';
import { Order, PaginationQueryDto } from 'src/common/dto/pagination-query.dto';
import { PaginationResult } from 'src/common/interface/pagination-result.interface';

@Injectable()
export class AreaService {
  constructor(
    @InjectModel(Area.name)
    private readonly areaModel: Model<Area>,
  ) { }

  async create(createAreaDto: CreateAreaDto) {
    try {
      const area = await this.areaModel.create(createAreaDto);
      return area;
    } catch (error) {
      throw error;
    }
  }

  async findAll(paginationQueryDto: PaginationQueryDto): Promise<PaginationResult<Area>> {
    const { limit = 10, page, order, sortBy } = paginationQueryDto;
    try {
      const areas = await this.areaModel.find().limit(limit).skip((page - 1) * limit).sort({ [sortBy]: order === Order.ASC ? 1 : -1 }).select('-__v').exec();
      const totalareas = await this.areaModel.countDocuments().exec();
      return {
        data: areas,
        limit,
        page,
        totalPages: Math.ceil(totalareas / limit),
        total: totalareas
      };
    } catch (error) {
      throw error
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
