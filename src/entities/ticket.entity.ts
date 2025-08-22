import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToOne,
  CreateDateColumn,
  UpdateDateColumn,
} from 'typeorm';
import { Unit } from './unit.entity';
import { Resident } from './resident.entity';
import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';

export enum TicketStatus {
  OPEN = 'open',
  IN_PROGRESS = 'in_progress',
  RESOLVED = 'resolved',
  CLOSED = 'closed',
}

@Entity()
export class Ticket {
  @ApiProperty()
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @ApiProperty()
  @Column()
  title: string;

  @ApiPropertyOptional()
  @Column({ type: 'text', nullable: true })
  description?: string;

  @ApiProperty({ enum: TicketStatus })
  @Column({ type: 'enum', enum: TicketStatus, default: TicketStatus.OPEN })
  status: TicketStatus;

  @ManyToOne(() => Resident, (resident) => resident.tickets, {
    onDelete: 'CASCADE',
  })
  resident: Resident;

  @ManyToOne(() => Unit, (unit) => unit.tickets, { onDelete: 'CASCADE' })
  unit: Unit;

  @ApiProperty()
  @CreateDateColumn()
  createdAt: Date;

  @ApiProperty()
  @UpdateDateColumn()
  updatedAt: Date;
}
