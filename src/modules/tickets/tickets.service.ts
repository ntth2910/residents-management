import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Ticket } from '../../entities/ticket.entity';
import { Resident } from '../../entities/resident.entity';
import { Unit } from '../../entities/unit.entity';
import { CreateTicketDto } from 'src/dtos/ticket/create-ticket.dto';
import { UpdateTicketDto } from 'src/dtos/ticket/update-ticket.dto';

@Injectable()
export class TicketsService {
  constructor(
    @InjectRepository(Ticket)
    private ticketsRepo: Repository<Ticket>,
    @InjectRepository(Resident)
    private residentsRepo: Repository<Resident>,
    @InjectRepository(Unit)
    private unitsRepo: Repository<Unit>,
  ) {}

  findAll(): Promise<Ticket[]> {
    return this.ticketsRepo.find({ relations: ['resident', 'unit'] });
  }

  async findOne(id: string): Promise<Ticket> {
    const ticket = await this.ticketsRepo.findOne({
      where: { id },
      relations: ['resident', 'unit'],
    });
    if (!ticket) throw new NotFoundException('Ticket not found');
    return ticket;
  }

  async create(dto: CreateTicketDto): Promise<Ticket> {
    const resident = await this.residentsRepo.findOne({
      where: { id: dto.residentId },
    });
    if (!resident) throw new NotFoundException('Resident not found');

    const unit = await this.unitsRepo.findOne({ where: { id: dto.unitId } });
    if (!unit) throw new NotFoundException('Unit not found');

    const ticket = this.ticketsRepo.create({ ...dto, resident, unit });
    return this.ticketsRepo.save(ticket);
  }

  async update(id: string, dto: UpdateTicketDto): Promise<Ticket> {
    const ticket = await this.findOne(id);
    Object.assign(ticket, dto);
    return this.ticketsRepo.save(ticket);
  }

  async remove(id: string): Promise<void> {
    const ticket = await this.findOne(id);
    await this.ticketsRepo.remove(ticket);
  }
}
