import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import { v4 as uuidv4 } from 'uuid';

@Schema({timestamps:true})
export class StatusProject {

    @Prop({type:String, default:uuidv4})
    _id:string;

    @Prop({type:String})
    name: string;

    @Prop({type:String})
    color: string;
}
export const statusprojectSchema = SchemaFactory.createForClass(StatusProject)
