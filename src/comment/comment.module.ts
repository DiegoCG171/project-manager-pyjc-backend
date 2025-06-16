import { Module } from '@nestjs/common';
import { CommentService } from './comment.service';
import { CommentController } from './comment.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { Comment, CommentSchema } from './entities/comment.entity';
import { ProjectModule } from 'src/project/project.module';

@Module({
  controllers: [CommentController],
  providers: [CommentService],
  imports: [
    MongooseModule.forFeature([
      {
        name: Comment.name,
        schema: CommentSchema
      }
    ]),
    ProjectModule
  ]
})
export class CommentModule { }
