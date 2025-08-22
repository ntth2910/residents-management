import {
  Controller,
  Get,
  Post,
  Patch,
  Delete,
  Param,
  Body,
  UseGuards,
} from '@nestjs/common';
import { TicketsService } from './tickets.service';
import { Ticket } from '../../entities/ticket.entity';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';
import { ApiTags, ApiBearerAuth, ApiResponse } from '@nestjs/swagger';
import { UpdateTicketDto } from 'src/dtos/ticket/update-ticket.dto';
import { CreateTicketDto } from 'src/dtos/ticket/create-ticket.dto';

@ApiTags('Tickets')
@ApiBearerAuth()
@UseGuards(JwtAuthGuard)
@Controller('tickets')
export class TicketsController {
  constructor(private readonly ticketsService: TicketsService) {}

  @Get()
  @ApiResponse({
    status: 200,
    description: 'List of tickets',
    type: [Ticket],
  })
  findAll(): Promise<Ticket[]> {
    return this.ticketsService.findAll();
  }

  @Get(':id')
  @ApiResponse({ status: 200, description: 'ticket detail', type: Ticket })
  findOne(@Param('id') id: string): Promise<Ticket> {
    return this.ticketsService.findOne(id);
  }

  @Post()
  @ApiResponse({ status: 201, description: 'create new ticket', type: Ticket })
  create(@Body() dto: CreateTicketDto): Promise<Ticket> {
    return this.ticketsService.create(dto);
  }

  @Patch(':id')
  @ApiResponse({ status: 200, description: 'update ticket', type: Ticket })
  update(
    @Param('id') id: string,
    @Body() dto: UpdateTicketDto,
  ): Promise<Ticket> {
    return this.ticketsService.update(id, dto);
  }

  @Delete(':id')
  @ApiResponse({ status: 200, description: 'delete ticket' })
  remove(@Param('id') id: string): Promise<void> {
    return this.ticketsService.remove(id);
  }
}
