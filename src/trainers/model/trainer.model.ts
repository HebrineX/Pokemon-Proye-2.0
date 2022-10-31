import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

export type TrainerDocument = Trainer & Document;
@Schema()
export class Trainer {
  @Prop({ type: String, required: true })
  name: string;
  @Prop({ type: [String], required: true })
  medalls: [string];
  @Prop({ type: Number, required: true })
  pokeballs: number;
  @Prop({ type: [Number], required: true })
  pokedexCompleted: [number];
  @Prop({ type: [String], required: true })
  pokemonTrunk: [string];
}

export const TrainerSchema = SchemaFactory.createForClass(Trainer);
