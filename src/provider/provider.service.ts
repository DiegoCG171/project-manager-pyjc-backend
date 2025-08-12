import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateProviderDto } from './dto/create-provider.dto';
import { UpdateProviderDto } from './dto/update-provider.dto';
import { InjectModel } from '@nestjs/mongoose';
import { Provider } from './entities/provider.entity';
import { Model } from 'mongoose';
import { Order, PaginationQueryDto } from 'src/common/dto/pagination-query.dto';
import { PaginationResult } from 'src/common/interface/pagination-result.interface';

@Injectable()
export class ProviderService {
  constructor(
    @InjectModel(Provider.name)
    private readonly providerModel: Model<Provider>
  ) { }
  async create(createProviderDto: CreateProviderDto) {
    try {
      const provider = await this.providerModel.create(createProviderDto)
      return provider;
    } catch (error) {
      throw error
    }
  }

  async findAll(paginationQueryDto: PaginationQueryDto): Promise<PaginationResult<Provider>> {
    const { limit = 10, page, order, sortBy } = paginationQueryDto;
    try {
      const providers = await this.providerModel.find().limit(limit).skip((page - 1) * limit).sort({ [sortBy]: order === Order.ASC ? 1 : -1 }).select('-__v').exec();
      const totalproviders = await this.providerModel.countDocuments().exec();
      return {
        data: providers,
        limit,
        page,
        totalPages: Math.ceil(totalproviders / limit),
        total: totalproviders
        // currentPage:0
      };
    } catch (error) {
      throw error
    }
  }

  async findOne(_id: string) {
    try {
      const provider = await this.providerModel.findOne({ _id }).exec();
      if (!provider) {
        throw new NotFoundException(`El provider con id ${_id} no existe`)
      }
      return provider;
    } catch (error) {
      throw error;
    }
  }

  async update(_id: string, updateProviderDto: UpdateProviderDto) {
    try {
      const provider = await this.findOne(_id)
      Object.assign(provider, updateProviderDto)
      return await this.providerModel.create(provider)
    } catch (error) {
      throw error;
    }
  }

  async remove(_id: string) {
    try {
      const provider = await this.findOne(_id)
      await this.providerModel.deleteOne({ _id: provider._id })
      return { message: `El provider con id ${provider._id} se elimino corectamente` }
    } catch (error) {
      throw error
    }
  }
}
