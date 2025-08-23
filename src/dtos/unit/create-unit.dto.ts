import { IsString, IsOptional, IsNumber } from 'class-validator';
import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';

export class CreateUnitDto {
  @ApiProperty({ description: 'name of unit' })
  @IsString()
  name: string;

  @ApiPropertyOptional({ description: 'floor' })
  @IsOptional()
  @IsNumber()
  floor?: number;

  @ApiProperty({ description: 'building id' })
  @IsString()
  buildingId: string;
}
