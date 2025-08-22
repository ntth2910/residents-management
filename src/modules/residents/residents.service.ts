import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Resident } from '../../entities/resident.entity';
import { Unit } from '../../entities/unit.entity';
import { CreateResidentDto } from 'src/dtos/resident/create-resident.dto';
import { UpdateResidentDto } from 'src/dtos/resident/update-resident.dto';

@Injectable()
export class ResidentsService {
  constructor(
    @InjectRepository(Resident)
    private residentsRepo: Repository<Resident>,
    @InjectRepository(Unit)
    private unitsRepo: Repository<Unit>,
  ) {}

  async findAll(): Promise<Resident[]> {
    return this.residentsRepo.find({ relations: ['unit'] });
  }

  async findOne(id: string): Promise<Resident> {
    const resident = await this.residentsRepo.findOne({
      where: { id },
      relations: ['unit'],
    });
    if (!resident) throw new NotFoundException('Resident not found');
    return resident;
  }

  async create(dto: CreateResidentDto): Promise<Resident> {
    const unit = await this.unitsRepo.findOne({ where: { id: dto.unitId } });
    if (!unit) throw new NotFoundException('Unit not found');

    const resident = this.residentsRepo.create({ ...dto, unit });
    return this.residentsRepo.save(resident);
  }

  async update(id: string, dto: UpdateResidentDto): Promise<Resident> {
    const resident = await this.findOne(id);
    Object.assign(resident, dto);
    return this.residentsRepo.save(resident);
  }

  async remove(id: string): Promise<void> {
    const resident = await this.findOne(id);
    await this.residentsRepo.remove(resident);
  }
}
