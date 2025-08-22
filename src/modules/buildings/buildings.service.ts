import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Building } from '../../entities/building.entity';
import { CreateBuildingDto } from 'src/dtos/building/create-building.dto';
import { UpdateBuildingDto } from 'src/dtos/building/update-building.dto';

@Injectable()
export class BuildingsService {
  constructor(@InjectRepository(Building) private repo: Repository<Building>) {}

  findAll(): Promise<Building[]> {
    return this.repo.find({ relations: ['units'] });
  }

  async findOne(id: string): Promise<Building> {
    const building = await this.repo.findOne({
      where: { id },
      relations: ['units'],
    });
    if (!building) throw new NotFoundException('Building not found');
    return building;
  }

  create(dto: CreateBuildingDto): Promise<Building> {
    const building = this.repo.create(dto);
    return this.repo.save(building);
  }

  async update(id: string, dto: UpdateBuildingDto): Promise<Building> {
    await this.repo.update(id, dto);
    return this.findOne(id);
  }

  async remove(id: string): Promise<void> {
    const result = await this.repo.delete(id);
    if (result.affected === 0)
      throw new NotFoundException('Building not found');
  }
}
