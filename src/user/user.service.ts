import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { InjectModel } from '@nestjs/mongoose';
import { User } from './entities/user.entity';
import { Model } from 'mongoose';

@Injectable()
export class UserService {
  constructor(
    @InjectModel(User.name)
    private readonly userModel: Model<User>
  ){}
  async create(createUserDto: CreateUserDto) {
    try{
      const user = await this.userModel.create(createUserDto);
      return user;
    }catch(error){
      throw error;
    }
  }

  async findAll() {
    try{
      const users = await this.userModel.find().exec();
      return users;
    }catch(error){
      throw error
    }
  }

  async findOne(id: string) {
    try{
      const user = await this.userModel.findOne({ id: id }).exec()
      if(!user){
        throw new NotFoundException(`El usuario con id ${id} no existe`);
      }
      return user;
    }catch(error){
      throw error
    }
  }

  async update(id: string, updateUserDto: UpdateUserDto) {
    try{
      const user = await this.findOne(id)
      Object.assign(user, updateUserDto)
      return await this.userModel.create(user)
    }catch(error){
      throw error;
    }
  }

  async remove(id: string) {
    try{
      const user = await this.findOne(id)
      await this.userModel.deleteOne(user.id)
    }catch(error){
      throw error
    }
  }

}
