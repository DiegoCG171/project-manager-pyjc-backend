import { IsArray, IsString, ValidateNested } from 'class-validator';
import { Type } from 'class-transformer';

class Statements {
  @IsString()
  effect: string;

  @IsArray()
  actions: string;
}

export class CreateRolDto {
  @IsString()
  name: string;

  @IsString()
  description: string;

  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => Statements)
  statements: Statements[]
}
