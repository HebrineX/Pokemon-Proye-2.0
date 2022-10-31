import { Module } from '@nestjs/common';
import { PokeballsService } from './pokeballs.service';
import { PokeballsController } from './pokeballs.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { Pokeball, PokeballSchema } from './model/pokeball.model';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: 'Pokeball', schema: PokeballSchema }]),
  ],
  controllers: [PokeballsController],
  providers: [PokeballsService],
})
export class PokeballsModule {}
