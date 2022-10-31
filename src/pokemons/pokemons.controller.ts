import {
  Controller,
  Get,
  Post,
  Put,
  Delete,
  Res,
  Body,
  HttpStatus,
  Param,
  NotFoundException,
} from '@nestjs/common';
import { FastifyReply } from 'fastify';
import { CreatePokemonDTO } from './dto/pokemon.dto';
import { PokemonsService } from './pokemons.service';
import { pokemonsFirstGen } from './arrayPokes';
@Controller('pokemons')
export class PokemonsController {
  constructor(private pokemonsServices: PokemonsService) {}
  @Get('/')
  async getPokemons(@Res() res: FastifyReply) {
    const pokemons = await this.pokemonsServices.getPokemons();
    return res.status(HttpStatus.OK).send({
      message: 'Pokemons In Database',
      pokemons,
    });
  }

  @Get(':pokedexIdParam')
  async getPokemon(
    @Res() res: FastifyReply,
    @Param('pokedexIdParam') pokedexIdParam: string,
  ) {
    if (!pokedexIdParam.match(/^[0-9a-fA-F]{24}$/)) {
      res.status(HttpStatus.NOT_ACCEPTABLE).send({
        message: `The ID ${pokedexIdParam} must be an legal ID Pokemon`,
      });
    }
    const pokemon = await this.pokemonsServices.getPokemon(pokedexIdParam);
    if (!pokemon) throw new NotFoundException('Pokemon Does not exists');
    return res.status(HttpStatus.OK).send({
      message: 'Searched Pokemon is :',
      pokemon,
    });
  }

  @Get('/all/:pokedexIdParam')
  async getPokemonsByName(
    @Res() res: FastifyReply,
    @Param('pokedexIdParam') pokedexIdParam: number,
  ) {
    const pokemon = await this.pokemonsServices.getPokemonByPokedex(
      pokedexIdParam,
    );
    if (!pokemon) throw new NotFoundException('Pokemon Does not exists');
    return res.status(HttpStatus.OK).send({
      message: 'Searched Pokemons is :',
      pokemon,
    });
  }

  @Post('/create')
  async createPokemon(
    @Res() res: FastifyReply,
    @Body() createPokemonDTO: CreatePokemonDTO,
  ) {
    const createPoke = await this.pokemonsServices.createPokemon(
      createPokemonDTO,
    );
    return res.status(HttpStatus.OK).send({
      message: 'Pokemon Succefully Created',
      createPoke,
    });
  }

  @Put('/update/all/:pokedexIdParam')
  async updatePokemonByPokedex(
    @Res() res: FastifyReply,
    @Body() createPokemonDTO: CreatePokemonDTO,
    @Param('pokedexIdParam') pokedexIdParam: string,
  ) {
    const updatePoke = await this.pokemonsServices.updatePokemonByPokedex(
      createPokemonDTO,
      parseInt(pokedexIdParam),
    );
    if (!updatePoke) throw new NotFoundException('Pokemon Does not exists');
    return res.status(HttpStatus.OK).send({
      message: 'Pokemon Edited Succefully',
      updatePoke,
    });
  }
  @Put('/update/:pokedexIdParam')
  async updatePokemonById(
    @Res() res: FastifyReply,
    @Body() createPokemonDTO: CreatePokemonDTO,
    @Param('pokedexIdParam') pokedexIdParam: string,
  ) {
    const updatePoke = await this.pokemonsServices.updatePokemonById(
      createPokemonDTO,
      pokedexIdParam,
    );
    if (!updatePoke) throw new NotFoundException('Pokemon Does not exists');
    return res.status(HttpStatus.OK).send({
      message: 'Pokemon Edited Succefully',
      updatePoke,
    });
  }

  @Delete('/delete/:pokedexIdParam')
  async deletePokemonById(
    @Res() res: FastifyReply,
    @Param('pokedexIdParam') pokedexIdParam: string,
  ) {
    const deletePoke = await this.pokemonsServices.deletePokemonById(
      pokedexIdParam,
    );
    return res.status(HttpStatus.OK).send({
      message: 'Pokemon Deleted succefully',
      deletePoke,
    });
  }

  @Post('/createFirstGen')
  async createFirstGen(@Res() res: FastifyReply) {
    const createPoke = await this.pokemonsServices.createFirstGenPokemons(
      pokemonsFirstGen,
    );
    return res.status(HttpStatus.OK).send({
      message: 'Pokemon Succefully Created',
      createPoke,
    });
  }
}
