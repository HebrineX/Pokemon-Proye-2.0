import { Injectable } from '@nestjs/common';
import { Model } from 'mongoose';
import { InjectModel } from '@nestjs/mongoose';
import { CreatePokeballDto } from './dto/create-pokeball.dto';
import { Pokeball, PokeballDocument } from './model/pokeball.model';
@Injectable()
export class PokeballsService {
  constructor(
    @InjectModel(Pokeball.name)
    private readonly pokeballModel: Model<PokeballDocument>,
  ) {}

  async createPokeball(
    createPokeballDto: CreatePokeballDto,
  ): Promise<PokeballDocument> {
    const newPokeball = new this.pokeballModel(createPokeballDto);
    return await newPokeball.save();
  }

  async getPokeballs(): Promise<PokeballDocument[]> {
    const allPokeballs = await this.pokeballModel.find();
    return allPokeballs;
  }

  async getPokeball(idPokeball: string): Promise<PokeballDocument> {
    const pokeball = await this.pokeballModel.findById(idPokeball);
    return pokeball;
  }

  async updatePokeball(
    idPokeball: string,
    updatePokeballDto: CreatePokeballDto,
  ): Promise<PokeballDocument> {
    const updatePokeball = await this.pokeballModel.findByIdAndUpdate(
      idPokeball,
      updatePokeballDto,
      { new: true },
    );
    return updatePokeball;
  }

  async deletePokeball(idPokeball: string): Promise<PokeballDocument> {
    const deletePokeball = await this.pokeballModel.findByIdAndDelete(
      idPokeball,
    );
    return deletePokeball;
  }
}
