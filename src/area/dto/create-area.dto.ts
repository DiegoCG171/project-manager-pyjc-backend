import { IsArray, IsNumber, IsString, IsUUID } from 'class-validator';

export class CreateAreaDto {
  @IsString()
  name: string;

  @IsString()
  leader: string;

  @IsArray()
  @IsString({ each: true })
  projects: string[];

  @IsNumber()
  order: number;

  @IsUUID()
  category: string;
}
