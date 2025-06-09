import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import {v4 as uuidv4} from 'uuid';

@Schema({ timestamps: true })
export class RecoveryCode {

    @Prop({ type: String, default: uuidv4 })
    _id: string

    @Prop({ type: String })
    user_id: string

    @Prop({ type: String, length: 6 })
    code: string

    @Prop({ type: Date })
    expiresAt: string

    @Prop({ type: Number, default: 0 })
    attemps: number

}

export const RecoveryCodeSchema = SchemaFactory.createForClass(RecoveryCode);