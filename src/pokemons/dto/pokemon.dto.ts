import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';

export class CreatePokemonDTO {
  @ApiProperty()
  readonly name: string;
  @ApiPropertyOptional()
  readonly alias?: string;
  @ApiProperty()
  readonly type: string[];
  @ApiProperty()
  readonly imageURL: string;
  @ApiProperty()
  readonly pokedexId: number;
  @ApiPropertyOptional()
  readonly level?: number;
  @ApiPropertyOptional()
  readonly experience?: number;
  @ApiPropertyOptional()
  readonly levelRate?: number[];
}
