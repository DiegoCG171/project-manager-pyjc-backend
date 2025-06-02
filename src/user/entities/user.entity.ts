import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import { v4 as uuidv4 } from 'uuid';

@Schema({ timestamps: true })
export class User {

    @Prop({ type: String, default: uuidv4})
    id: string;

    @Prop({ type: String })
    email: string;

    @Prop({ type: String })
    password: string;

    @Prop({ type: String })
    full_name: string;

    @Prop({ type: [String] })
    rol: string[]

    @Prop({ type: String, length: 10 })
    phone: string
}
export const UserSchema = SchemaFactory.createForClass(User)

