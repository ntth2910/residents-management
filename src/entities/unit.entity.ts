import {
  Column,
  CreateDateColumn,
  Entity,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import { Building } from './building.entity';
import { Resident } from './resident.entity';
import { Ticket } from './ticket.entity';
import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';

@Entity()
export class Unit {
  @ApiProperty()
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @ApiProperty()
  @Column()
  name: string;

  @ManyToOne(() => Building, (building) => building.units, {
    onDelete: 'CASCADE',
  })
  building: Building;

  @OneToMany(() => Resident, (resident) => resident.unit)
  residents: Resident[];

  // 👇
  @OneToMany(() => Ticket, (ticket) => ticket.unit)
  tickets: Ticket[];

  @ApiProperty()
  @CreateDateColumn()
  createdAt: Date;

  @ApiProperty()
  @UpdateDateColumn()
  updatedAt: Date;
}
