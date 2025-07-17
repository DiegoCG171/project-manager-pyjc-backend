import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import { Document } from "mongoose";
import { v4 as uuidv4 } from 'uuid';

@Schema({timestamps:true})
export class Activities{
    @Prop({type:String})
    name: string;

    @Prop({type:String})
    descipcion: string;
}
export const ActivitySchema = SchemaFactory.createForClass(Activities)

@Schema({timestamps:true})
export class Plataform extends Document{
    @Prop({type:String, default:uuidv4})
    _id:string;

    @Prop({type:String})
    name: string;

    @Prop({ type: [ActivitySchema], default: [] })
    activities: Activities[];

}
export const PlataformSchema = SchemaFactory.createForClass(Plataform)

