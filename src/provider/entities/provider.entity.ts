import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import { v4 as uuidv4 } from 'uuid';

@Schema({timestamps:true})
export class Provider {

    @Prop({type:String, default:uuidv4})
    _id:string;

    @Prop({type:String})
    name: string;

    @Prop({type:String})
    status:string;

    @Prop({type:String})
    contact_name:string;

    @Prop({type:String})
    contact_email:string;

    @Prop({type:String})
    contact_phone:string;

    @Prop({type:String})
    adress:string;
}

export const ProviderSchema = SchemaFactory.createForClass(Provider)
