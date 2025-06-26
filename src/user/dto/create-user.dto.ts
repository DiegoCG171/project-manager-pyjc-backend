import { Type } from 'class-transformer';
import {
  IsArray,
  IsEmail,
  IsNumberString,
  IsString,
  Length,
} from 'class-validator';

export class CreateUserDto {
  @IsString()
  @IsEmail()
  email: string;

  @IsString()
  password: string;

  @IsString()
  full_name: string;

  @IsArray()
  @IsString({ each: true })
  rol: string[];

  @IsNumberString()
  @Length(10)
  phone: string;

  @IsArray()
  @IsString({ each: true })
  assignaments: string[];
}
