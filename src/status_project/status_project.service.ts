import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateStatusProjectDto } from './dto/create-status_project.dto';
import { UpdateStatusProjectDto } from './dto/update-status_project.dto';
import { InjectModel } from '@nestjs/mongoose';
import { StatusProject } from './entities/status_project.entity';
import { Model } from 'mongoose';
import { ProjectService } from 'src/project/project.service';

@Injectable()
export class StatusProjectService {
  constructor(
    @InjectModel(StatusProject.name)
    private readonly statusprojectModel: Model<StatusProject>
  ){}
  async create(createStatusProjectDto: CreateStatusProjectDto) {
    try {
      const status = await this.statusprojectModel.create(createStatusProjectDto);
      return status;
    } catch (error) {
      throw error;
    }
  }

  async findAll() {
    try {
      const status = await this.statusprojectModel.find().exec();
      return status;
    } catch (error) {
      throw error;
    }
  }

  async findOne(_id: string) {
    try {
          const status = await this.statusprojectModel.findOne({ _id }).exec();
          if (!status) {
            throw new NotFoundException(`El status project con id ${_id} no existe`);
          }
          return status;
        } catch (error) {
          throw error;
        }
  }

  async update(_id: string, updateStatusProjectDto: UpdateStatusProjectDto) {
    try {
      const status = await this.findOne(_id);
      Object.assign(status, updateStatusProjectDto);
      return await this.statusprojectModel.create(status);
    } catch (error) {
      console.error(error);
      throw error;
    }
  }

  async remove(_id: string) {
    try {
      const status = await this.findOne(_id);
      await this.statusprojectModel.deleteOne({ _id: status._id });
      return { message: `El status project con id ${status._id} se elimino correctamente` };
    } catch (error) {
      throw error;
    }
  }
}
