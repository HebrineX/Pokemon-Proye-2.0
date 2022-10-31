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
import { CreateTrainerDTO } from './dto/trainer.dto';
import { TrainersService } from './trainers.service';

@Controller('trainers')
export class TrainersController {
  constructor(private trainersServices: TrainersService) {}

  @Get('/')
  async getTrainers(@Res() res: FastifyReply) {
    const trainers = await this.trainersServices.getTrainers();
    return res.status(HttpStatus.OK).send({
      message: 'Trainers In Database',
      trainers,
    });
  }

  @Get(':trainerId')
  async getTrainer(
    @Res() res: FastifyReply,
    @Param('trainerId') trainerId: string,
  ) {
    if (!trainerId.match(/^[0-9a-fA-F]{24}$/)) {
      res.status(HttpStatus.NOT_ACCEPTABLE).send({
        message: `The ID ${trainerId} must be an legal ID Trainer`,
      });
    }
    const trainer = await this.trainersServices.getTrainer(trainerId);
    if (!trainer) throw new NotFoundException('Trainer Does Not exists');
    return res.status(HttpStatus.OK).send({
      message: 'Searched Trainer is : ',
      trainer,
    });
  }

  @Post('/create')
  async createTrainer(
    @Res() res: FastifyReply,
    @Body() createTrainerDTO: CreateTrainerDTO,
  ) {
    const createTrainer = await this.trainersServices.createTrainer(
      createTrainerDTO,
    );
    return res.status(HttpStatus.OK).send({
      message: 'Trainer Succefuly Created',
      createTrainer,
    });
  }

  @Put('/update/:trainerId')
  async updateTrainer(
    @Res() res: FastifyReply,
    @Body() createTrainerDTO: CreateTrainerDTO,
    @Param('trainerId') trainerId: string,
  ) {
    if (!trainerId.match(/^[0-9a-fA-F]{24}$/)) {
      res.status(HttpStatus.NOT_ACCEPTABLE).send({
        message: `The ID ${trainerId} must be an legal ID Trainer`,
      });
    }
    const updateTrainer = await this.trainersServices.updateTrainer(
      createTrainerDTO,
      trainerId,
    );
    if (!updateTrainer) throw new NotFoundException('Trainer Does Not exists');
    return res.status(HttpStatus.OK).send({
      message: 'Trainer Edited Succefully',
      updateTrainer,
    });
  }

  @Delete('/delete/:trainerId')
  async deleteTrainer(
    @Res() res: FastifyReply,
    @Param('trainerId') trainerId: string,
  ) {
    if (!trainerId.match(/^[0-9a-fA-F]{24}$/)) {
      res.status(HttpStatus.NOT_ACCEPTABLE).send({
        message: `The ID ${trainerId} must be an legal ID Trainer`,
      });
    }
    const deleteTrainer = await this.trainersServices.deletePokemon(trainerId);

    if (!deleteTrainer) throw new NotFoundException('Trainer Does Not exists');

    return res.status(HttpStatus.OK).send({
      message: 'Trainer Succefully Deleted',
      deleteTrainer,
    });
  }
}
