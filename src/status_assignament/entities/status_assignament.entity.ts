import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import { v4 as uuidv4 } from 'uuid';
@Schema({timestamps:true})
export class StatusAssignament {

    @Prop({type:String, default:uuidv4})
    _id:string;

    @Prop({type:String})
    name: string;

    @Prop({type:String})
    color: string;

    @Prop({ type: [String] })
    assignaments: string[];
}

export const StatusAssignamentSchema = SchemaFactory.createForClass(StatusAssignament)
