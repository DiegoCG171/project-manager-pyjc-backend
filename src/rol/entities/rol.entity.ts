import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';
import { v4 as uuidv4 } from 'uuid';


@Schema()
class Statements extends Document{
  effect: string;
  actions: string[];
}

@Schema({ timestamps: true })
export class Rol extends Document {
  @Prop({ type: String, default: uuidv4 })
  _id: string;

  @Prop({ type: String })
  name: string;

  @Prop({ type: String })
  description: string;

  @Prop({ type: Statements})
  statements: Statements
}
export const RolSchema = SchemaFactory.createForClass(Rol);

