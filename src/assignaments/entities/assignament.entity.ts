import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Types } from 'mongoose';
import { Plataform } from 'src/plataform/entities/plataform.entity';
import { Project } from 'src/project/entities/project.entity';
import { StatusProject } from 'src/status_project/entities/status_project.entity';
import { User } from 'src/user/entities/user.entity';
import { v4 as uuidv4 } from 'uuid';

@Schema({timestamps:true})
export class Assignament{
    
    @Prop({type:String,default:() => uuidv4()})
    _id:string;

    @Prop({type: Types.ObjectId, ref: 'Project' })
    id_project: Project | Types.ObjectId;

    @Prop({ type: Types.ObjectId, ref: 'User' })
    id_user:User | Types.ObjectId;

    @Prop({ type: Types.ObjectId, ref: 'Plataform' })
    id_plataform: Plataform | Types.ObjectId;

    @Prop({type:String})
    plataform_activity:string;

    @Prop({type: Types.ObjectId, ref: 'Status' })
    id_status: StatusProject | Types.ObjectId;

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