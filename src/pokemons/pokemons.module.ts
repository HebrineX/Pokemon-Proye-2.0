import { Module } from '@nestjs/common';
import { PokemonsController } from './pokemons.controller';
import { PokemonsService } from './pokemons.service';
import { MongooseModule } from '@nestjs/mongoose';
import { Pokemon, PokemonSchema } from './model/pokemons.model';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: Pokemon.name, schema: PokemonSchema }]),
  ],
  controllers: [PokemonsController],
  providers: [PokemonsService],
})
export class PokemonsModule {}
