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
import { UnitsService } from './units.service';
import { Unit } from '../../entities/unit.entity';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';
import { ApiTags, ApiBearerAuth, ApiResponse } from '@nestjs/swagger';
import { CreateUnitDto } from 'src/dtos/unit/create-unit.dto';
import { UpdateUnitDto } from 'src/dtos/unit/update-unit.dto';

@ApiTags('Units')
@ApiBearerAuth('access-token')
@UseGuards(JwtAuthGuard)
@Controller('units')
export class UnitsController {
  constructor(private readonly unitsService: UnitsService) {}

  @Get()
  @ApiResponse({ status: 200, description: 'list of units', type: [Unit] })
  findAll(): Promise<Unit[]> {
    return this.unitsService.findAll();
  }

  @Get(':id')
  @ApiResponse({ status: 200, description: 'unit detail', type: Unit })
  findOne(@Param('id') id: string): Promise<Unit> {
    return this.unitsService.findOne(id);
  }

  @Post()
  @ApiResponse({ status: 201, description: 'create new unit', type: Unit })
  create(@Body() dto: CreateUnitDto): Promise<Unit> {
    return this.unitsService.create(dto);
  }

  @Patch(':id')
  @ApiResponse({ status: 200, description: 'update unit', type: Unit })
  update(@Param('id') id: string, @Body() dto: UpdateUnitDto): Promise<Unit> {
    return this.unitsService.update(id, dto);
  }

  @Delete(':id')
  @ApiResponse({ status: 200, description: 'delete unit' })
  remove(@Param('id') id: string): Promise<void> {
    return this.unitsService.remove(id);
  }
}
