import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Unit } from '../../entities/unit.entity';
import { Building } from '../../entities/building.entity';
import { CreateUnitDto } from 'src/dtos/unit/create-unit.dto';
import { UpdateUnitDto } from 'src/dtos/unit/update-unit.dto';

@Injectable()
export class UnitsService {
  constructor(
    @InjectRepository(Unit)
    private unitsRepo: Repository<Unit>,
    @InjectRepository(Building)
    private buildingsRepo: Repository<Building>,
  ) {}

  async findAll(): Promise<Unit[]> {
    return this.unitsRepo.find({ relations: ['building'] });
  }

  async findOne(id: string): Promise<Unit> {
    const unit = await this.unitsRepo.findOne({
      where: { id },
      relations: ['building'],
    });
    if (!unit) throw new NotFoundException('Unit not found');
    return unit;
  }

  async create(dto: CreateUnitDto): Promise<Unit> {
    const building = await this.buildingsRepo.findOne({
      where: { id: dto.buildingId },
    });
    if (!building) throw new NotFoundException('Building not found');

    const unit = this.unitsRepo.create({ ...dto, building });
    return this.unitsRepo.save(unit);
  }

  async update(id: string, dto: UpdateUnitDto): Promise<Unit> {
    const unit = await this.findOne(id);
    Object.assign(unit, dto);
    return this.unitsRepo.save(unit);
  }

  async remove(id: string): Promise<void> {
    const unit = await this.findOne(id);
    await this.unitsRepo.remove(unit);
  }
}
