import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Building } from '../../entities/building.entity';
import { BuildingsService } from './buildings.service';
import { BuildingsController } from './buildings.controller';

@Module({
  imports: [TypeOrmModule.forFeature([Building])],
  providers: [BuildingsService],
  controllers: [BuildingsController],
})
export class BuildingsModule {}
