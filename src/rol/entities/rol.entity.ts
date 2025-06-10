import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { v4 as uuidv4 } from 'uuid';

@Schema({ timestamps: true })
export class Rol {
  @Prop({ type: String, default: uuidv4 })
  _id: string;

  @Prop({ type: String })
  name: string;

  @Prop({ type: String })
  description: string;

  //statemens
  @Prop({
    type: [
      {
        effect: { type: String },
        actions: { type: [String] },
      },
    ],
  })
  statements: {
    effect: string;
    actions: string[];
  }[];
}
export const RolSchema = SchemaFactory.createForClass(Rol);
/* 
  :)
*/
