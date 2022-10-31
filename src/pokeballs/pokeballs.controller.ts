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
import { PokeballsService } from './pokeballs.service';
import { CreatePokeballDto } from './dto/create-pokeball.dto';

@Controller('pokeballs')
export class PokeballsController {
  constructor(private readonly pokeballsService: PokeballsService) {}

  @Get()
  async getPokeballs(@Res() res: FastifyReply) {
    const allPokeballs = await this.pokeballsService.getPokeballs();
    return res.status(HttpStatus.OK).send({
      message: 'Pokeballs in database',
      allPokeballs,
    });
  }

  @Get(':idPokeball')
  async getPokeball(
    @Res() res: FastifyReply,
    @Param('idPokeball') idPokeball: string,
  ) {
    if (!idPokeball.match(/^[0-9a-fA-F]{24}$/)) {
      res.status(HttpStatus.NOT_ACCEPTABLE).send({
        message: `The ID ${idPokeball} must be an legal ID Pokeball`,
      });
    }
    const pokeball = await this.pokeballsService.getPokeball(idPokeball);
    if (!pokeball) throw new NotFoundException('Pokeball Does Not exists');
    return res.status(HttpStatus.OK).send({
      message: 'Searched Pokeball is : ',
      pokeball,
    });
  }

  @Post()
  async createPokeball(
    @Res() res: FastifyReply,
    @Body() createPokeballDto: CreatePokeballDto,
  ) {
    const createPokeball = await this.pokeballsService.createPokeball(
      createPokeballDto,
    );
    return res.status(HttpStatus.OK).send({
      message: 'Pokeball created in database',
      createPokeball,
    });
  }

  @Put(':idPokeball')
  async updatePokeball(
    @Res() res: FastifyReply,
    @Param('idPokeball') idPokeball: string,
    @Body() updatePokeballDto: CreatePokeballDto,
  ) {
    if (!idPokeball.match(/^[0-9a-fA-F]{24}$/)) {
      res.status(HttpStatus.NOT_ACCEPTABLE).send({
        message: `The ID ${idPokeball} must be an legal ID Pokeball`,
      });
    }
    const updatePokeball = await this.pokeballsService.updatePokeball(
      idPokeball,
      updatePokeballDto,
    );
    if (!updatePokeball)
      throw new NotFoundException('Pokeball Does Not exists');
    return res.status(HttpStatus.OK).send({
      message: 'Pokeball edited succefully',
      updatePokeball,
    });
  }

  @Delete(':idPokeball')
  async deletePokeball(
    @Res() res: FastifyReply,
    @Param('idPokeball') idPokeball: string,
  ) {
    if (!idPokeball.match(/^[0-9a-fA-F]{24}$/)) {
      res.status(HttpStatus.NOT_ACCEPTABLE).send({
        message: `The ID ${idPokeball} must be an legal ID Pokeball`,
      });
    }
    const deletePokeball = await this.pokeballsService.deletePokeball(
      idPokeball,
    );
    if (!deletePokeball)
      throw new NotFoundException('Pokeball Does Not exists');
    return res.status(HttpStatus.OK).send({
      message: 'Pokeball delete Succefully',
      deletePokeball,
    });
  }
}
