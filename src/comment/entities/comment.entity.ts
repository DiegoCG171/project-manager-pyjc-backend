import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import { v4 as uuidv4 } from 'uuid';

@Schema({timestamps:true})
export class Comment {
    
    @Prop({type:String, default:uuidv4})
    _id:string;

    @Prop({type:String, default:uuidv4})
    id_user:string;

    @Prop({type:String})
    comment:string;

    @Prop({type:String, default:uuidv4})
    parent:string;

}

export const CommentSchema = SchemaFactory.createForClass(Comment)
