import { IsString, IsOptional } from 'class-validator';
import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';

export class CreateBuildingDto {
  @ApiProperty({ description: 'building name' })
  @IsString()
  name: string;

  @ApiPropertyOptional({ description: 'address' })
  @IsOptional()
  @IsString()
  address?: string;
}
