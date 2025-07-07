import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { CreateLogDto } from './dto/create-log.dto';
import { Log } from './entities/log.entity';
import { UpdateLogDto } from './dto/update-log.dto';

@Injectable()
export class LogService {
  constructor(
    @InjectModel(Log.name)
    private readonly logModel: Model<Log>,
  ) {}

  async create(createLogDto: CreateLogDto): Promise<Log> {
    try {
      const log = await this.logModel.create(createLogDto);
      return log;
    } catch (error) {
      console.log(error)
      throw error;
    }
  }

  async findAll(): Promise<Log[]> {
    try {
      const logs = await this.logModel.find().exec();
      return logs;
    } catch (error) {
      throw error;
    }
  }

  async findOne(id: string) {
    try {
      const log = await this.logModel.findById(id).exec();
      if (!log) {
        throw new NotFoundException(`Este log con id ${id} no existe`);
      }
      return log;
    } catch (error) {
      throw error;
    }
  }

  async update(id: string, updateLogDto: UpdateLogDto) {
    try {
      const log = await this.findOne(id);
      Object.assign(log, updateLogDto);
      return await this.logModel.findByIdAndUpdate(id, updateLogDto, {
        new: true,
      });
    } catch (error) {
      throw error;
    }
  }

  async remove(id: string) {
    try {
      const log = await this.findOne(id);
      await this.logModel.findByIdAndDelete(id);
      return { message: `Log con id ${id} eliminado correctamente` };
    } catch (error) {
      throw error;
    }
  }
}
