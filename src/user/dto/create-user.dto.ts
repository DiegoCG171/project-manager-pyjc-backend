<<<<<<< HEAD
import {IsEmail,IsString} from "class-validator"

export class CreateUserDto {

    @IsString()
    @IsEmail()
    email:string

    @IsString()
    password:string;
=======
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
  
>>>>>>> d0ecd81679f054a592ada54fa031e2c2d17fb8b3
}
