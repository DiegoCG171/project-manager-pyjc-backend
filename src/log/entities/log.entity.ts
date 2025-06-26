import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';
import { v4 as uuidv4 } from 'uuid';

@Schema()
class Changes extends Document {
  @Prop({ type: String })
  prop: string;

  @Prop({ type: String })
  previusValue: any;

  @Prop({ type: String })
  newValue: any;
}

@Schema({ timestamps: true })
export class Log extends Document {
  @Prop({ type: String, default: uuidv4 })
  _id: string;

  @Prop({ type: String })
  entityType: string;

  @Prop({ type: String })
  action: string;

  @Prop({ type: String })
  performedBy: uuidv4;

  @Prop({ type: [Object] })
  changes: Changes;
}
export const LogSchema = SchemaFactory.createForClass(Log);
