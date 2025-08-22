import { IsString, IsOptional } from 'class-validator';
import { ApiPropertyOptional } from '@nestjs/swagger';

export class UpdateResidentDto {
  @ApiPropertyOptional({ description: 'name' })
  @IsOptional()
  @IsString()
  name?: string;

  @ApiPropertyOptional({ description: 'emial' })
  @IsOptional()
  @IsString()
  email?: string;

  @ApiPropertyOptional({ description: 'phone' })
  @IsOptional()
  @IsString()
  phone?: string;
}
