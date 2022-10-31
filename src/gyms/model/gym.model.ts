import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

export type GymDocument = Gym & Document;
@Schema()
export class Gym {
  @Prop({ type: String, required: true })
  city: string;
  @Prop({ type: String, required: true })
  typeMedall: string;
  @Prop({ type: String, required: true })
  leader: string;
  @Prop({ type: String, required: true })
  imageMedall: string;
  @Prop({ type: [String], required: true })
  recruits: [string];
}

export const GymSchema = SchemaFactory.createForClass(Gym);
