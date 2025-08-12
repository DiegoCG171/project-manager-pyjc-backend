import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateStatusProjectDto } from './dto/create-status_project.dto';
import { UpdateStatusProjectDto } from './dto/update-status_project.dto';
import { InjectModel } from '@nestjs/mongoose';
import { StatusProject } from './entities/status_project.entity';
import { Model } from 'mongoose';
import { Order, PaginationQueryDto } from 'src/common/dto/pagination-query.dto';
import { PaginationResult } from 'src/common/interface/pagination-result.interface';

@Injectable()
export class StatusProjectService {
  constructor(
    @InjectModel(StatusProject.name)
    private readonly statusproyectModel:Model<StatusProject>,
  ){}
  
  async create(createStatusProjectDto: CreateStatusProjectDto) {
    try {
      const status = await this.statusproyectModel.create(createStatusProjectDto);
      return status;
    } catch (error) {
      throw error;
    }
  }

  async findAll(paginationQueryDto: PaginationQueryDto): Promise<PaginationResult<StatusProject>> {
    const { limit=10, page, order, sortBy } = paginationQueryDto;
    try {
      const status = await this.statusproyectModel.find().limit(limit).skip((page - 1) * limit).sort({ [sortBy]: order === Order.ASC ? 1 : -1 }).exec();
      const totalstatus = await this.statusproyectModel.countDocuments().exec();
      return {
        data: status,
        limit,
        page,
        totalPages: Math.ceil(totalstatus / limit),
        total: totalstatus
        // currentPage:0
      };
    } catch (error) {
      throw error;
    }
  }

  async findOne(_id: string) {
    try {
          const status = await this.statusproyectModel.findOne({ _id }).exec();
          if (!status) {
            throw new NotFoundException(`El status con id ${_id} no existe`);
          }
          return status;
        } catch (error) {
          throw error;
        }
  }

  async update(id: string, updateStatusProjectDto: UpdateStatusProjectDto) {
    try {
      const status = await this.findOne(id);
      Object.assign(status, updateStatusProjectDto);
      return await this.statusproyectModel.create(status);
    } catch (error) {
      throw error;
    }
  }

  async remove(_id: string) {
    try {
      const status = await this.findOne(_id);
      await this.statusproyectModel.deleteOne({ _id: status._id });
      return { message: `El status con id ${status._id} se elimino correctamente` };
    } catch (error) {
      throw error;
    }
  }
}
