import { IsOptional, IsString, IsEnum } from 'class-validator';
import { UserRole } from '../../entities/user.entity';

export class UpdateUserDto {
  @IsOptional()
  @IsString()
  password?: string;

  @IsOptional()
  @IsEnum(UserRole)
  role?: UserRole;
}
