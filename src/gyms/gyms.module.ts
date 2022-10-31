import { Module } from '@nestjs/common';
import { GymsController } from './gyms.controller';
import { GymsService } from './gyms.service';
import { MongooseModule } from '@nestjs/mongoose';
import { GymSchema, Gym } from './model/gym.model';
@Module({
  imports: [MongooseModule.forFeature([{ name: Gym.name, schema: GymSchema }])],
  controllers: [GymsController],
  providers: [GymsService],
})
export class GymsModule {}
