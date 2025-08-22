import { ApiProperty } from '@nestjs/swagger';
import { IsString } from 'class-validator';

export class LoginDto {
  @ApiProperty({ description: 'user name' })
  @IsString()
  username: string;

  @ApiProperty()
  @IsString()
  password: string;
}
