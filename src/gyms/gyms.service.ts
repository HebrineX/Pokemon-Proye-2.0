import { Model } from 'mongoose';
import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { CreateGymDTO } from './dto/gym.dto';
import { Gym, GymDocument } from './model/gym.model';

@Injectable()
export class GymsService {
  constructor(@InjectModel(Gym.name) private gymModel: Model<GymDocument>) {}

  async getGyms(): Promise<GymDocument[]> {
    const findAll = await this.gymModel.find();
    return findAll;
  }
  async getGym(gymId: string): Promise<Gym> {
    const gym = await this.gymModel.findById(gymId);
    return gym;
  }

  async createGym(createGymDTO: CreateGymDTO): Promise<GymDocument> {
    const newGym = new this.gymModel(createGymDTO);
    return await newGym.save();
  }

  async updateGym(
    createGymDTO: CreateGymDTO,
    gymId: string,
  ): Promise<GymDocument> {
    const updateGym = await this.gymModel.findByIdAndUpdate(
      gymId,
      createGymDTO,
      { new: true },
    );
    return updateGym;
  }

  async deleteGym(gymId: string): Promise<Gym> {
    const deleteGym = await this.gymModel.findByIdAndDelete(gymId);
    return deleteGym;
  }
  async deleteAll() {
    const deleteAll = await this.gymModel.deleteMany();
    return deleteAll;
  }
}
