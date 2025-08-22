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
import { BuildingsService } from './buildings.service';
import { Building } from '../../entities/building.entity';
import { UpdateBuildingDto } from 'src/dtos/building/update-building.dto';
import { CreateBuildingDto } from 'src/dtos/building/create-building.dto';
import { ApiBearerAuth, ApiResponse, ApiTags } from '@nestjs/swagger';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';

@ApiTags('Buildings')
@ApiBearerAuth('access-token')
@UseGuards(JwtAuthGuard)
@Controller('buildings')
export class BuildingsController {
  constructor(private readonly buildingsService: BuildingsService) {}

  @Get()
  @ApiResponse({
    status: 200,
    description: 'list of buildings',
    type: [Building],
  })
  findAll(): Promise<Building[]> {
    return this.buildingsService.findAll();
  }

  @Get(':id')
  @ApiResponse({
    status: 200,
    description: 'detail of each building',
    type: [Building],
  })
  findOne(@Param('id') id: string): Promise<Building> {
    return this.buildingsService.findOne(id);
  }

  @Post()
  @ApiResponse({
    status: 201,
    description: 'Create new building',
    type: Building,
  })
  create(@Body() dto: CreateBuildingDto): Promise<Building> {
    return this.buildingsService.create(dto);
  }

  @Patch(':id')
  @ApiResponse({ status: 200, description: 'Update building', type: Building })
  update(
    @Param('id') id: string,
    @Body() dto: UpdateBuildingDto,
  ): Promise<Building> {
    return this.buildingsService.update(id, dto);
  }

  @Delete(':id')
  @ApiResponse({ status: 200, description: 'Delete building' })
  remove(@Param('id') id: string): Promise<void> {
    return this.buildingsService.remove(id);
  }
}
