import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateProviderDto } from './dto/create-provider.dto';
import { UpdateProviderDto } from './dto/update-provider.dto';
import { InjectModel } from '@nestjs/mongoose';
import { Provider } from './entities/provider.entity';
import { Model } from 'mongoose';

@Injectable()
export class ProviderService {
  constructor(
    @InjectModel(Provider.name)
    private readonly providerModel: Model<Provider>
  ) { }
  async create(createProviderDto: CreateProviderDto) {
    try {
      const provider = await this.providerModel.create(createProviderDto)
    } catch (error) {
      throw error
    }
  }

  async findAll() {
    try {
      const provider = await this.providerModel.find().exec();
      return provider;
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
