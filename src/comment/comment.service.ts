import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateCommentDto } from './dto/create-comment.dto';
import { UpdateCommentDto } from './dto/update-comment.dto';
import { InjectModel } from '@nestjs/mongoose';
import { Comment } from './entities/comment.entity';
import { Model } from 'mongoose';
import { ProjectService } from 'src/project/project.service';

@Injectable()
export class CommentService {
  constructor(
    @InjectModel(Comment.name)
    private readonly commentModel: Model<Comment>,
    private readonly projectService: ProjectService 
  ){}

  async create(createCommentDto: CreateCommentDto) {
    try {
      const { id_project } = createCommentDto;
      const comment = await this.commentModel.create(createCommentDto)
      if(comment){

        const project = await this.projectService.findOne(id_project);
        project.comments.push(comment._id);
        await this.projectService.update(id_project, { comments: project.comments })
        
      }
      return comment;
    } catch (error) {
      throw error
    }
  }

  async findAll() {
    try {
      const comment = await this.commentModel.find().exec()
      return comment;
    } catch (error) {
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
