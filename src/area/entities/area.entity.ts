import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { v4 as uuidv4 } from 'uuid';

@Schema({ timestamps: true })
export class Area {
  @Prop({ type: String, default: uuidv4 })
  _id: string;

  @Prop({ type: String })
  name: string;

  @Prop({ type: String })
  leader: string;

  @Prop({ type: [String] })
  projects: string[];

  @Prop({ type: Number })
  order: number;

  @Prop({ type: String, default: uuidv4 })
  category: string;
}
export const AreaSchema = SchemaFactory.createForClass(Area);
