import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToOne,
  OneToMany,
  CreateDateColumn,
  UpdateDateColumn,
} from 'typeorm';
import { Unit } from './unit.entity';
import { Ticket } from './ticket.entity';
import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';

@Entity()
export class Resident {
  @ApiProperty()
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @ApiProperty()
  @Column()
  name: string;

  @ApiPropertyOptional()
  @Column({ nullable: true })
  email?: string;

  @ApiPropertyOptional()
  @Column({ nullable: true })
  phone?: string;

  @ManyToOne(() => Unit, (unit) => unit.residents, { onDelete: 'CASCADE' })
  unit: Unit;

  // 👇
  @OneToMany(() => Ticket, (ticket) => ticket.resident)
  tickets: Ticket[];

  @ApiProperty()
  @CreateDateColumn()
  createdAt: Date;

  @ApiProperty()
  @UpdateDateColumn()
  updatedAt: Date;
}
