import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateCategoryDto } from './dto/create-category.dto';
import { UpdateCategoryDto } from './dto/update-category.dto';
// import { HashService } from 'src/auth/hash.service';
import { Category, CategoryDocument } from './entities/category.entity';
import { Model } from 'mongoose';
import { InjectModel } from '@nestjs/mongoose';
import { Order, PaginationQueryDto } from 'src/common/dto/pagination-query.dto';
import { PaginationResult } from 'src/common/interface/pagination-result.interface';

@Injectable()
export class CategoryService {
  constructor(
    @InjectModel(Category.name)
    private readonly categoryModel: Model<CategoryDocument>,
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

  async findAll(paginationQueryDto: PaginationQueryDto): Promise<PaginationResult<Category>>{
    const { limit=10, page, order, sortBy } = paginationQueryDto;
    try {
      const categories = await this.categoryModel.find().limit(limit).skip((page - 1) * limit).sort({ [sortBy]: order === Order.ASC ? 1 : -1 }).select('-__v').exec();
      const totalcategories = await this.categoryModel.countDocuments().exec();
      return {
          data: categories,
          limit,
          page,
          totalPages: Math.ceil(totalcategories / limit),
          total: totalcategories
        };} catch (error) {
      throw error
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
        .findByIdAndUpdate(id, updateCategoryDto, { new: true })
        .exec();

      if (!updatedCategory) {
        throw new NotFoundException(`Categoría con ID ${id} no encontrada`);
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
