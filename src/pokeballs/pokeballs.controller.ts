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
import { ApiTags, ApiResponse } from '@nestjs/swagger';

@ApiTags('Pokeballs')
@Controller('pokeballs')
export class PokeballsController {
  constructor(private readonly pokeballsService: PokeballsService) {}

  @Get('/')
  @ApiResponse({
    status: 200,
    description: 'Pokeballs in Database.',
  })
  async getPokeballs(@Res() res: FastifyReply) {
    const allPokeballs = await this.pokeballsService.getPokeballs();
    return res.status(HttpStatus.OK).send({
      message: 'Pokeballs in database',
      allPokeballs,
    });
  }

  @Get('/:idPokeball')
  @ApiResponse({
    status: 200,
    description: 'Searched Pokeball by ID.',
  })
  @ApiResponse({
    status: 406,
    description: 'The ID must be an legal ID Pokeball.',
  })
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

  @Post('/create')
  @ApiResponse({
    status: 200,
    description: 'Searched Pokeball by Pokedex.',
  })
  @ApiResponse({
    status: 406,
    description: 'Pokeball Does not exists in Database.',
  })
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

  @Put('/update/:idPokeball')
  @ApiResponse({
    status: 200,
    description: 'Pokeball Edited Succefully.',
  })
  @ApiResponse({
    status: 406,
    description: 'Pokeball Does not exists in Database.',
  })
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

  @Delete('/delete/:idPokeball')
  @ApiResponse({
    status: 200,
    description: 'Pokeball Deleted Succefully.',
  })
  @ApiResponse({
    status: 406,
    description: 'Pokeball Does not exists in Database.',
  })
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
  @Delete('/delete/all')
  @ApiResponse({
    status: 200,
    description: 'All Pokeball Deleted .',
  })
  async deleteAllPokeballs(@Res() res: FastifyReply) {
    const deleteAll = await this.pokeballsService.deleteAll();
    return res.status(HttpStatus.OK).send({
      message: 'all Pokeballs Deleted succefully',
      deleteAll,
    });
  }
}
