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
import { CreateGymDTO } from './dto/gym.dto';
import { GymsService } from './gyms.service';
import { ApiTags, ApiResponse } from '@nestjs/swagger';

@ApiTags('Gyms')
@Controller('gyms')
export class GymsController {
  constructor(private gymServices: GymsService) {}

  @Get('/')
  @ApiResponse({
    status: 200,
    description: 'Gyms in Database.',
  })
  async getGyms(@Res() res: FastifyReply) {
    const gyms = await this.gymServices.getGyms();
    return res.status(HttpStatus.OK).send({
      message: 'Gyms in Database',
      gyms,
    });
  }

  @Get('/:gymId')
  @ApiResponse({
    status: 200,
    description: 'Searched Gym by ID.',
  })
  @ApiResponse({
    status: 406,
    description: 'The ID must be an legal ID Gym.',
  })
  async getGym(@Res() res: FastifyReply, @Param('gymId') gymId: string) {
    if (!gymId.match(/^[0-9a-fA-F]{24}$/)) {
      res.status(HttpStatus.NOT_ACCEPTABLE).send({
        message: `The ID ${gymId} must be an legal ID Gym`,
      });
    }
    const gym = await this.gymServices.getGym(gymId);
    if (!gym) throw new NotFoundException('Gym Does not exists');
    return res.status(HttpStatus.OK).send({
      message: ' Searched Gym is :',
      gym,
    });
  }

  @Post('/create')
  @ApiResponse({
    status: 200,
    description: 'The gym has been succefully created.',
  })
  async createGym(
    @Res() res: FastifyReply,
    @Body() createGymDTO: CreateGymDTO,
  ) {
    const createGym = await this.gymServices.createGym(createGymDTO);
    return res.status(HttpStatus.OK).send({
      message: 'The gym has been succefully created',
      createGym,
    });
  }

  @Put('/update/:gymId')
  @ApiResponse({
    status: 200,
    description: 'The gym has been successfully edited.',
  })
  @ApiResponse({
    status: 406,
    description: 'The ID must be an legal ID Gym.',
  })
  async updateGym(
    @Res() res: FastifyReply,
    @Body() createGymDTO: CreateGymDTO,
    @Param('gymId') gymId: string,
  ) {
    if (!gymId.match(/^[0-9a-fA-F]{24}$/)) {
      res.status(HttpStatus.NOT_ACCEPTABLE).send({
        message: `The ID ${gymId} must be an legal ID Gym`,
      });
    }

    const updateGym = await this.gymServices.updateGym(createGymDTO, gymId);
    if (!updateGym) throw new NotFoundException('Gym Does not exists');
    return res.status(HttpStatus.OK).send({
      message: 'The gym has been successfully edited',
      updateGym,
    });
  }

  @Delete('/delete/:gymId')
  @ApiResponse({
    status: 200,
    description: 'The gym has been successfully deleted.',
  })
  @ApiResponse({
    status: 406,
    description: 'The ID must be an legal ID Gym.',
  })
  async deleteGym(@Res() res: FastifyReply, @Param('gymId') gymId: string) {
    if (!gymId.match(/^[0-9a-fA-F]{24}$/)) {
      res.status(HttpStatus.NOT_ACCEPTABLE).send({
        message: `The ID ${gymId} must be an legal ID Gym`,
      });
    }
    const deleteGym = await this.gymServices.deleteGym(gymId);
    return res.status(HttpStatus.OK).send({
      message: 'The gym has been successfully deleted',
      deleteGym,
    });
  }

  @Delete('/delete/all')
  @ApiResponse({
    status: 200,
    description: 'All gyms Deleted succefully.',
  })
  async deleteAllPokemon(@Res() res: FastifyReply) {
    const deleteAll = await this.gymServices.deleteAll();
    return res.status(HttpStatus.OK).send({
      message: 'all gyms Deleted succefully',
      deleteAll,
    });
  }
}
