import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { PokemonsModule } from './pokemons/pokemons.module';
import { GymsModule } from './gyms/gyms.module';
import { PokeballsModule } from './pokeballs/pokeballs.module';
import { TrainersModule } from './trainers/trainers.module';
import { GymModule } from './gym/gym.module';
import { GymsModule } from './gyms/gyms.module';

@Module({
  imports: [PokemonsModule, GymsModule, GymModule, TrainersModule, PokeballsModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
