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
@Controller('gyms')
export class GymsController {
  constructor(private gymServices: GymsService) {}

  @Get('/')
  async getGyms(@Res() res: FastifyReply) {
    const gyms = await this.gymServices.getGyms();
    return res.status(HttpStatus.OK).send({
      message: 'Gyms in Database',
      gyms,
    });
  }

  @Get('/:gymId')
  async getGym(@Res() res: FastifyReply, @Param('gymId') gimId: string) {
    if (!gimId.match(/^[0-9a-fA-F]{24}$/)) {
      res.status(HttpStatus.NOT_ACCEPTABLE).send({
        message: `The ID ${gimId} must be an legal ID Gym`,
      });
    }
    const gym = await this.gymServices.getGym(gimId);
    if (!gym) throw new NotFoundException('Gym Does not exists');
    return res.status(HttpStatus.OK).send({
      message: ' Searched Gym is :',
      gym,
    });
  }

  @Post('/create')
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
  async updateGym(
    @Res() res: FastifyReply,
    @Body() createGymDTO: CreateGymDTO,
    @Param('gymId') gimId: string,
  ) {
    if (!gimId.match(/^[0-9a-fA-F]{24}$/)) {
      res.status(HttpStatus.NOT_ACCEPTABLE).send({
        message: `The ID ${gimId} must be an legal ID Gym`,
      });
    }

    const updateGym = await this.gymServices.updateGym(createGymDTO, gimId);
    if (!updateGym) throw new NotFoundException('Gym Does not exists');
    return res.status(HttpStatus.OK).send({
      message: 'The gym has been successfully edited',
      updateGym,
    });
  }

  @Delete('/delete/:gymId')
  async deleteGym(@Res() res: FastifyReply, @Param('gymId') gymId) {
    const deleteGym = await this.gymServices.deleteGym(gymId);
    return res.status(HttpStatus.OK).send({
      message: 'The gym has been successfully deleted',
      deleteGym,
    });
  }

  @Delete('/delete/all')
  async deleteAllPokemon(@Res() res: FastifyReply) {
    const deleteAll = await this.gymServices.deleteAll();
    return res.status(HttpStatus.OK).send({
      message: 'all gyms Deleted succefully',
      deleteAll,
    });
  }
}
