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
import { ResidentsService } from './residents.service';
import { Resident } from '../../entities/resident.entity';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';
import { ApiTags, ApiBearerAuth, ApiResponse } from '@nestjs/swagger';
import { CreateResidentDto } from 'src/dtos/resident/create-resident.dto';
import { UpdateResidentDto } from 'src/dtos/resident/update-resident.dto';

@ApiTags('Residents')
@ApiBearerAuth()
@UseGuards(JwtAuthGuard)
@Controller('residents')
export class ResidentsController {
  constructor(private readonly residentsService: ResidentsService) {}

  @Get()
  @ApiResponse({
    status: 200,
    description: 'list of residents',
    type: [Resident],
  })
  findAll(): Promise<Resident[]> {
    return this.residentsService.findAll();
  }

  @Get(':id')
  @ApiResponse({ status: 200, description: 'resident detail', type: Resident })
  findOne(@Param('id') id: string): Promise<Resident> {
    return this.residentsService.findOne(id);
  }

  @Post()
  @ApiResponse({
    status: 201,
    description: 'create new resident',
    type: Resident,
  })
  create(@Body() dto: CreateResidentDto): Promise<Resident> {
    return this.residentsService.create(dto);
  }

  @Patch(':id')
  @ApiResponse({ status: 200, description: 'update resident', type: Resident })
  update(
    @Param('id') id: string,
    @Body() dto: UpdateResidentDto,
  ): Promise<Resident> {
    return this.residentsService.update(id, dto);
  }

  @Delete(':id')
  @ApiResponse({ status: 200, description: 'Xóa cư dân' })
  remove(@Param('id') id: string): Promise<void> {
    return this.residentsService.remove(id);
  }
}
