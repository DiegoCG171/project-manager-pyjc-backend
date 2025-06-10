import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateRolDto } from './dto/create-rol.dto';
import { UpdateRolDto } from './dto/update-rol.dto';
import { InjectModel } from '@nestjs/mongoose';
import { Rol } from './entities/rol.entity';
import { Model } from 'mongoose';

@Injectable()
export class RolService {
  constructor(
    @InjectModel(Rol.name)
    private readonly rolModel: Model<Rol>,
  ) {}

  async create(createRolDto: CreateRolDto) {
    try {
      const rol = await this.rolModel.create(createRolDto);
      return rol;
    } catch (error) {
      throw error;
    }
  }

  async findAll() {
    //id: string
    try {
      const rols = await this.rolModel.find().exec();
      return rols;
    } catch (error) {
      throw error;
    }
  }

  async findOne(id: string) {
    try {
      const rol = await this.rolModel.findById(id).exec();
      if (!rol) {
        throw new NotFoundException(`El rol con id ${id} no existe`);
      }
      return rol;
    } catch (error) {
      throw error;
    }
  }

  async update(id: string, updateRolDto: UpdateRolDto) {
    try {
      const rol = await this.findOne(id);
      Object.assign(rol, updateRolDto);
      return await this.rolModel.findByIdAndUpdate(id, updateRolDto, {
        new: true,
      });
    } catch (error) {
      throw error;
    }
  }

  async remove(id: string) {
    try {
      const rol = await this.findOne(id);
      await this.rolModel.findByIdAndDelete(id);
      return { message: `Rol con id ${id} eliminado correctamente` };
    } catch (error) {
      throw error;
    }
  }
}
/* 
  :)
*/
