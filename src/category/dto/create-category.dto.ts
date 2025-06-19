import { IsArray, IsString } from 'class-validator';

export class CreateCategoryDto {
  @IsString()
  name: string;

  @IsString()
  description: string;

  @IsString()
  //@Matches(/^#([0-9A-Fa-f]{6}|[0-9A-Fa-f]{3})$/)
  color: string;

  @IsArray()
  @IsString({ each: true })
  areas: string[];
}
