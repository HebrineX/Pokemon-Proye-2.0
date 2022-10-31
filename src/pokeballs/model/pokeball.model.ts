import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

export type PokeballDocument = Pokeball & Document;
@Schema()
export class Pokeball {
  @Prop({ type: String, required: true })
  typePokeball: string;
  @Prop({ type: Number, required: true })
  accuracy: number;
  @Prop({ type: String, required: true })
  imageURL: string;
}

export const PokeballSchema = SchemaFactory.createForClass(Pokeball);
