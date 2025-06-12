import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateCategoryDto } from './dto/create-category.dto';
import { UpdateCategoryDto } from './dto/update-category.dto';
// import { HashService } from 'src/auth/hash.service';
import { Category } from './entities/category.entity';
import { Model } from 'mongoose';
import { InjectModel } from '@nestjs/mongoose';

@Injectable()
export class CategoryService {
  constructor(
    @InjectModel(Category.name)
    private readonly categoryModel: Model<Category>,
    // private readonly hashService: HashService,
  ) {}
  async create(createCategoryDto: CreateCategoryDto) {
    try {
      const category = await this.categoryModel.create(createCategoryDto);
      return category;
    } catch (error) {
      throw error;
    }
  }

  async findAll() {
    try {
      const categories = await this.categoryModel.find().exec();
      return categories;
    } catch (error) {
      throw error;
    }
  }

  async findOne(id: string) {
    try {
      const category = await this.categoryModel.findById(id).exec();
      if (!category) {
        throw new NotFoundException(`la categoria con id ${id} no existe`);
      }
      return category;
    } catch (error) {
      throw error;
    }
  }

  async update(id: string, updateCategoryDto: UpdateCategoryDto) {
    try {
      const updatedCategory = await this.categoryModel
        .findOneAndUpdate({ _id: id }, updateCategoryDto, { new: true })
        .exec();

      if (!updatedCategory) {
        throw new NotFoundException(`No existe la categoria con el id ${id} `);
      }

      return updatedCategory;
    } catch (error) {
      console.error('Error al actualizar categoría:', error);
      throw error;
    }
  }

  async remove(id: string) {
    try {
      const category = await this.findOne(id);
      await this.categoryModel.findByIdAndDelete(id);
      return {
        message: `La categoria con el id ${id} eliminado correctamente`,
      };
    } catch (error) {
      throw error;
    }
  }
}
