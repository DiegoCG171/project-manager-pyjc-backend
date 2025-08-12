import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateStatusAssignamentDto } from './dto/create-status_assignament.dto';
import { UpdateStatusAssignamentDto } from './dto/update-status_assignament.dto';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { StatusAssignament } from './entities/status_assignament.entity';
import { Order, PaginationQueryDto } from 'src/common/dto/pagination-query.dto';
import { PaginationResult } from 'src/common/interface/pagination-result.interface';

@Injectable()
export class StatusAssignamentService {
  constructor(
    @InjectModel(StatusAssignament.name)
    private readonly statusAssignamentModel:Model<StatusAssignament>
  ){}
  async create(createStatusAssignamentDto: CreateStatusAssignamentDto) {
    try {
      const staus = await this.statusAssignamentModel.create(createStatusAssignamentDto);
      return staus;
    } catch (error) {
      throw error;
    }
  }

  async findAll(paginationQueryDto: PaginationQueryDto): Promise<PaginationResult<StatusAssignament>>{
    const { limit=10, page, order, sortBy } = paginationQueryDto;
    try {
      const status = await this.statusAssignamentModel.find().limit(limit).skip((page - 1) * limit).sort({ [sortBy]: order === Order.ASC ? 1 : -1 }).select('-__v').exec();
      const totalstatus = await this.statusAssignamentModel.countDocuments().exec();
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
          const status = await this.statusAssignamentModel.findById(_id).exec();
          if (!status) {
            throw new NotFoundException(`El status con id ${_id} no existe`);
          }
          return status;
        } catch (error) {
          throw error;
        }
  }

  async update(_id: string, updateStatusAssignamentDto: UpdateStatusAssignamentDto) {
    try {
      const staus = await this.findOne(_id)
      Object.assign(staus,updateStatusAssignamentDto)
      return await this.statusAssignamentModel.create(staus)
    } catch (error) {
      throw error;
    }
  }

  async remove(_id: string) {
    try {
      const status = await this.findOne(_id)
      await this.statusAssignamentModel.deleteOne({_id: status._id})
      return {message:`El status con id ${status._id} se elimino corectamente`};
    } catch (error) {
      throw error
    }
  }
}
