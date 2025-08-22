import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ResidentsService } from './residents.service';
import { ResidentsController } from './residents.controller';
import { Resident } from '../../entities/resident.entity';
import { Unit } from '../../entities/unit.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Resident, Unit])],
  controllers: [ResidentsController],
  providers: [ResidentsService],
  exports: [ResidentsService],
})
export class ResidentsModule {}
