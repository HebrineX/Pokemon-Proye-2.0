import { Injectable } from '@nestjs/common';
import { Model } from 'mongoose';
import { InjectModel } from '@nestjs/mongoose';
import { Trainer, TrainerDocument } from './model/trainer.model';
import { CreateTrainerDTO } from './dto/trainer.dto';
@Injectable()
export class TrainersService {
  constructor(
    @InjectModel(Trainer.name)
    private readonly trainerModel: Model<TrainerDocument>,
  ) {}

  async getTrainers(): Promise<TrainerDocument[]> {
    const trainers = await this.trainerModel.find();
    return trainers;
  }

  async getTrainer(trainerId: string): Promise<TrainerDocument> {
    const trainer = await this.trainerModel.findById(trainerId);
    return trainer;
  }

  async createTrainer(
    createTrainerDTO: CreateTrainerDTO,
  ): Promise<TrainerDocument> {
    const newTrainer = new this.trainerModel(createTrainerDTO);
    return await newTrainer.save();
  }

  async updateTrainer(
    createTrainerDTO: CreateTrainerDTO,
    trainerId: string,
  ): Promise<TrainerDocument> {
    const updateTrainer = await this.trainerModel.findByIdAndUpdate(
      trainerId,
      createTrainerDTO,
      { new: true },
    );
    return updateTrainer;
  }

  async deletePokemon(trainerId: string): Promise<TrainerDocument> {
    const deleteTrainer = await this.trainerModel.findByIdAndDelete(trainerId);
    return deleteTrainer;
  }
}
