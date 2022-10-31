export class CreatePokemonDTO {
  readonly name: string;
  readonly alias?: string;
  readonly type: string[];
  readonly imageURL: string;
  readonly pokedexId: number;
  readonly level?: number;
  readonly experience?: number;
  readonly levelRate?: number[];
}
