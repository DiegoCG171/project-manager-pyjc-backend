import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { v4 as uuidv4 } from 'uuid';

@Schema({timestamps:true})
export class Assignament{
    
    @Prop({type:String,default:uuidv4})
    _id:string;

    @Prop({type:String})
    id_project:string;

    @Prop({type:String})
    id_user:string;

    @Prop({type:String})
    plataform:string;

    @Prop({type:String})
    plataform_activity:string;

    @Prop({type:String})
    status_color:string;

    @Prop({type:Number})
    percentage:number;

    @Prop({type:Number})
    hours:number;

    @Prop({type:Number})
    hours_per_day:number;

    @Prop({type:Number})
    extra_hours:number;

    @Prop({type:Date})
    start_date:Date;

    @Prop({type:Date})
    finish_date:Date;

    @Prop({type:Number})
    test_cases:number;
}

export const AssignamentSchema = SchemaFactory.createForClass(Assignament)