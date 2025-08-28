import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateCommentDto } from './dto/create-comment.dto';
import { UpdateCommentDto } from './dto/update-comment.dto';
import { InjectModel } from '@nestjs/mongoose';
import { Comment } from './entities/comment.entity';
import { Model } from 'mongoose';
import { ProjectService } from 'src/project/project.service';
import { User } from 'src/user/entities/user.entity';
import { Order, PaginationQueryDto } from 'src/common/dto/pagination-query.dto';
import { PaginationResult } from 'src/common/interface/pagination-result.interface';

@Injectable()
export class CommentService {
  constructor(
    @InjectModel(Comment.name)
    private readonly commentModel: Model<Comment>,
  ){}

  async create(createCommentDto: CreateCommentDto, user: User) {
    try {
      const comment = await this.commentModel.create(createCommentDto)
      return comment;
      }
     catch (error) {
      throw error
    }
  }

  async findAll(paginationQueryDto: PaginationQueryDto):Promise<PaginationResult<Comment>> {
    const { limit=10, page, order, sortBy } = paginationQueryDto;
    try {
      const comment = await this.commentModel.find().limit(limit).skip((page - 1) * limit).sort({ [sortBy]: order === Order.ASC ? 1 : -1 }).select('-__v').exec();
      const totalcomments = await this.commentModel.countDocuments().exec();
      return {
          data: comment,
          limit,
          page,
          totalPages: Math.ceil(totalcomments / limit),
          total: totalcomments
        };} catch (error) {
      throw error
    }
  }

  async findOne(_id: string) {
    try {
      const comment = await this.commentModel.findOne({_id}).exec();
      if (!comment) {
        throw new NotFoundException(`el comentario con id ${_id} no existe`)
      }
      return comment;
    } catch (error) {
      throw error;
    }
  }

  async update(_id: string, updateCommentDto: UpdateCommentDto) {
    try {
      const comment = await this.findOne(_id)
      Object.assign(comment,updateCommentDto)
      return await this.commentModel.create(comment) 
    } catch (error) {
      throw error;
    }
  }

  async remove(_id: string) {
    try {
      const comment = await this.findOne(_id)
      await this.commentModel.deleteOne({_id:comment._id})
      return { message: `El comentario con id ${comment._id} se elimino corectamente` }
    } catch (error) {
      throw error;
    }
  }
}
