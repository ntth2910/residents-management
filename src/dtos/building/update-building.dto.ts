import { IsString, IsOptional } from 'class-validator';

export class UpdateBuildingDto {
  @IsOptional()
  @IsString()
  name?: string;
}
