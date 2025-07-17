import { Injectable, NotFoundException } from '@nestjs/common';
import { CreatePlataformDto } from './dto/create-plataform.dto';
import { UpdatePlataformDto } from './dto/update-plataform.dto';
import { InjectModel } from '@nestjs/mongoose';
import { Plataform } from './entities/plataform.entity';
import { Model } from 'mongoose';

@Injectable()
export class PlataformService {
  constructor(
    @InjectModel(Plataform.name)
    private readonly plataformModel: Model<Plataform>
  ){}
  async create(createPlataformDto: CreatePlataformDto) {
    try {
      const plataform = await this.plataformModel.create(createPlataformDto);
      return plataform;
    } catch (error) {
      throw error
    }
  }

  async findAll() {
    try {
      const plataform = await this.plataformModel.find().exec();
      return plataform;
    } catch (error) {
      throw error
    }
  }

  async findOne(_id: string) {
    try {
          const plataform = await this.plataformModel.findOne({ _id }).exec();
          if (!plataform) {
            throw new NotFoundException(`El plataform con id ${_id} no existe`)
          }
          return plataform;
        } catch (error) {
          throw error;
        }
  }

  async update(_id: string, updatePlataformDto: UpdatePlataformDto) {
    try {
      const plataform = await this.findOne(_id)
      Object.assign(plataform, updatePlataformDto)
      return await this.plataformModel.create(plataform)
    } catch (error) {
      throw error;
    }
  }

  async remove(_id: string) {
    try {
      const plataform = await this.findOne(_id)
      await this.plataformModel.deleteOne({ _id: plataform._id })
      return { message: `El plataform con id ${plataform._id} se elimino corectamente` }
    } catch (error) {
      throw error
    }
  }
}
