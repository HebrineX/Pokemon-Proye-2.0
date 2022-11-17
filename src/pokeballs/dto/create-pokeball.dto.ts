import { ApiProperty } from '@nestjs/swagger';

export class CreatePokeballDto {
  @ApiProperty()
  typePokeball: string;
  @ApiProperty()
  accuracy: number;
  @ApiProperty()
  imageURL: string;
}
