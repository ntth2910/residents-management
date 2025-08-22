import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UnitsService } from './units.service';
import { UnitsController } from './units.controller';
import { Unit } from '../../entities/unit.entity';
import { Building } from '../../entities/building.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Unit, Building])],
  controllers: [UnitsController],
  providers: [UnitsService],
  exports: [UnitsService],
})
export class UnitsModule {}
