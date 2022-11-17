import { ApiProperty } from '@nestjs/swagger';

export class CreateGymDTO {
  @ApiProperty()
  city: string;
  @ApiProperty()
  typeMedall: string;
  @ApiProperty()
  leader: string;
  @ApiProperty()
  imageMedall: string;
  @ApiProperty()
  recruits: string[];
}
