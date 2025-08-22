import { IsString, IsOptional, IsNumber } from 'class-validator';
import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';

export class CreateUnitDto {
  @ApiProperty({ description: 'Tên căn hộ / unit' })
  @IsString()
  name: string;

  @ApiPropertyOptional({ description: 'Số tầng của unit' })
  @IsOptional()
  @IsNumber()
  floor?: number;

  @ApiProperty({ description: 'ID của tòa nhà (building)' })
  @IsString()
  buildingId: string;
}
