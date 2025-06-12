import { IsString } from 'class-validator';

export class CreateCategoryDto {
  @IsString()
  name: string;

  @IsString()
  dscription: string;

  @IsString()
  color: string;
}
