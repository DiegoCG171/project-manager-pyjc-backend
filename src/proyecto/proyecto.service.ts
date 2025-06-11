import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateProyectoDto } from './dto/create-proyecto.dto';
import { UpdateProyectoDto } from './dto/update-proyecto.dto';
import { Model } from 'mongoose';
import { Proyecto } from './entities/proyecto.entity';
import { InjectModel } from '@nestjs/mongoose';

@Injectable()
export class ProyectoService {
  constructor(
    @InjectModel(Proyecto.name)
    private readonly proyectoModel:Model<Proyecto>
  ){}
  async create(createProyectoDto: CreateProyectoDto) {
    try {
      const proyecto = await this.proyectoModel.create(createProyectoDto);
      return proyecto;
    } catch (error) {
      throw error
    }
  }

  async findAll() {
    try {
      const proyecto = await this.proyectoModel.find().exec();
      return proyecto;
    } catch (error) {
      throw error
    }
  }

  async findOne(_id: string) {
    try {
      const proyecto = await this.proyectoModel.findOne({_id}).exec();
      if (!proyecto) {
        throw new NotFoundException(`El proyecto con id ${_id} no existe`);
      }
      return proyecto;
    } catch (error) {
      throw error;
    }
  }

  async update(_id: string, updateProyectoDto: UpdateProyectoDto) {
    try {
      const proyecto = await this.findOne(_id)
      Object.assign(proyecto,updateProyectoDto)
      return await this.proyectoModel.create(proyecto)
    } catch (error) {
      throw error;
    }
    }

  async remove(_id: string) {
    try {
      const proyecto = await this.findOne(_id)
      await this.proyectoModel.deleteOne({_id: proyecto._id})
      return {message:`El proyecto con id ${proyecto._id} se elimino corectamente`};
    } catch (error) {
      throw error
    }
  }
}
