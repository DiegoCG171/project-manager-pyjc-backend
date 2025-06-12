import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import { Date } from "mongoose";
import { v4 as uuidv4 } from 'uuid';

@Schema({timestamps:true})
export class Project {

    @Prop({type:String, default:uuidv4})
    _id:string;

    @Prop({type:String})
    name: string;

    @Prop({type:String})
    leader_name: string;

    @Prop({type:String})
    key: String;

    @Prop({type:Date})
    start_date:Date;

    @Prop({type:Date})
    finish_date: Date;

    @Prop({type:String,default:uuidv4})
    status_color:string;

    @Prop({type:String})
    priority:string;

    @Prop({type:String})
    pm_name:string;

    @Prop({type:String})
    purchase_order:string;

    @Prop({type:String})
    designer_name:string;

    @Prop({type:Number})
    total_hours:number;

    @Prop({type:Number})
    added_hours:number;

    @Prop({type:String})
    status_project:string;

    @Prop({ type: [String] })
    providers: string[];

    @Prop({ type: [String] })
    comments: string[];


}

export const ProjectSchema = SchemaFactory.createForClass(Project)