import { IsString, IsOptional } from 'class-validator';
import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';

export class CreateResidentDto {
  @ApiProperty({ description: 'name of residenet' })
  @IsString()
  name: string;

  @ApiPropertyOptional({ description: 'email' })
  @IsOptional()
  @IsString()
  email?: string;

  @ApiPropertyOptional({ description: 'phone' })
  @IsOptional()
  @IsString()
  phone?: string;

  @ApiProperty({ description: 'ID Unit' })
  @IsString()
  unitId: string;
}
