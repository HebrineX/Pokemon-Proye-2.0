import { Module } from '@nestjs/common';
import { PokemonsModule } from './pokemons/pokemons.module';
import { PokeballsModule } from './pokeballs/pokeballs.module';
import { TrainersModule } from './trainers/trainers.module';
import { GymsModule } from './gyms/gyms.module';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { MongooseModule } from '@nestjs/mongoose';
import * as dotenv from 'dotenv';
dotenv.config();
import config from './config';

@Module({
  imports: [
    PokemonsModule,
    GymsModule,
    TrainersModule,
    PokeballsModule,
    ConfigModule.forRoot({ isGlobal: true }),
    MongooseModule.forRoot(config.DATABASE_URL),
  ],
})
export class AppModule {
  static port: number;
  constructor(private readonly configService: ConfigService) {
    AppModule.port = +this.configService.get('PORT');
  }
}
