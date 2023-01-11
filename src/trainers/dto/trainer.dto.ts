import { ApiProperty } from '@nestjs/swagger';

export class CreateTrainerDTO {
  @ApiProperty()
  name: string;
  @ApiProperty()
  medalls: string[];
  @ApiProperty()
  team: string[];
  @ApiProperty()
  pokeballs: number;
  @ApiProperty()
  pokedexCompleted: number[];
  @ApiProperty()
  pokemonTrunk: string[];
}
