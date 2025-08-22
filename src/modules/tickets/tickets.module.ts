import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { TicketsService } from './tickets.service';
import { TicketsController } from './tickets.controller';
import { Ticket } from '../../entities/ticket.entity';
import { Resident } from '../../entities/resident.entity';
import { Unit } from '../../entities/unit.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Ticket, Resident, Unit])],
  controllers: [TicketsController],
  providers: [TicketsService],
  exports: [TicketsService],
})
export class TicketsModule {}
