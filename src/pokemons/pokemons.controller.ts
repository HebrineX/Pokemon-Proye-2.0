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
import { ApiTags, ApiResponse } from '@nestjs/swagger';

@ApiTags('Pokemons')
@Controller('pokemons')
export class PokemonsController {
  constructor(private pokemonsServices: PokemonsService) {}
  @Get('/')
  @ApiResponse({
    status: 200,
    description: 'Pokemons in Database.',
  })
  async getPokemons(@Res() res: FastifyReply) {
    const pokemons = await this.pokemonsServices.getPokemons();

    return res.status(HttpStatus.OK).send({
      message: 'Pokemons In Database',
      pokemons,
    });
  }

  @Get(':pokedexIdParam')
  @ApiResponse({
    status: 200,
    description: 'Searched Pokemon by ID.',
  })
  @ApiResponse({
    status: 406,
    description: 'The ID must be an legal ID Pokemon.',
  })
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
  @ApiResponse({
    status: 200,
    description: 'Searched Pokemon by Pokedex.',
  })
  @ApiResponse({
    status: 406,
    description: 'Pokemon Does not exists in Database.',
  })
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
  @ApiResponse({
    status: 200,
    description: 'Pokemon Succefully Created.',
  })
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

  @Post('/createFirstGen')
  @ApiResponse({
    status: 200,
    description: 'The first generation pokemons were successfully created.',
  })
  async createFirstGen(@Res() res: FastifyReply) {
    const createPoke = await this.pokemonsServices.createFirstGenPokemons(
      pokemonsFirstGen,
    );
    return res.status(HttpStatus.OK).send({
      message: 'The first generation pokemons were successfully created',
      createPoke,
    });
  }

  /*   @Put('/update/all/:pokedexIdParam')
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
  } */

  @Put('/update/:pokedexIdParam')
  @ApiResponse({
    status: 200,
    description: 'Pokemon Edited Succefully.',
  })
  @ApiResponse({
    status: 406,
    description: 'Pokemon Does not exists in Database.',
  })
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
  @ApiResponse({
    status: 200,
    description: 'Pokemon Deleted Succefully.',
  })
  @ApiResponse({
    status: 406,
    description: 'Pokemon Does not exists in Database.',
  })
  async deletePokemonById(
    @Res() res: FastifyReply,
    @Param('pokedexIdParam') pokedexIdParam: string,
  ) {
    const deletePoke = await this.pokemonsServices.deletePokemonById(
      pokedexIdParam,
    );

    if (!deletePoke) throw new NotFoundException('Pokemon Does not exists');
    return res.status(HttpStatus.OK).send({
      message: 'Pokemon Deleted succefully',
      deletePoke,
    });
  }

  @Delete('/delete/all')
  @ApiResponse({
    status: 200,
    description: 'All Pokemon Deleted .',
  })
  async deleteAllPokemon(@Res() res: FastifyReply) {
    const deleteAll = await this.pokemonsServices.deleteAll();
    return res.status(HttpStatus.OK).send({
      message: 'All Pokemon Deleted ',
      deleteAll,
    });
  }
}
