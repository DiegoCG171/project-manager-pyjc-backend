import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import { v4 as uuidv4 } from 'uuid';

@Schema({timestamps:true})
export class Comment {
    
    @Prop({type:String, default:uuidv4})
    _id:string;

    @Prop({type:String})
    comment:string;

    @Prop({type:String,default: null})
    parent:string | null;

}

export const CommentSchema = SchemaFactory.createForClass(Comment)
