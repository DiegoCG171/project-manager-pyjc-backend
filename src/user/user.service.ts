import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { InjectModel } from '@nestjs/mongoose';
import { User } from './entities/user.entity';
import { Model } from 'mongoose';
import { HashService } from 'src/auth/hash.service';

@Injectable()
export class UserService {
  constructor(
    @InjectModel(User.name)
    private readonly userModel: Model<User>,
    private readonly hashService: HashService
  ){}
  async create(createUserDto: CreateUserDto) {
    try{
      createUserDto.password = await this.hashService.hashPassword(createUserDto.password)
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
      const updatedUser = await this.userModel.findOneAndUpdate(
      { uuid: id },
      updateUserDto,
      { new: true } // Devuelve el documento actualizado
    ).exec();

    if (!updatedUser) {
      throw new NotFoundException(`Session with uuid ${id} not found`);
    }

    return updatedUser;
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
