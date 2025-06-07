import { IsArray, IsString, ValidateNested } from 'class-validator';
import { Type } from 'class-transformer';

export class CreateRolDto {
  @IsString()
  name: string;

  @IsString()
  description: string;

  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => Object)
  statements: {
    @IsString()
    effect: string;

    @IsArray()
    @IsString({ each: true })
    actions: string[];
  }[];
}

/*   @IsArray()
  @ValidateNested({ each: true })
  @Type(() => StatementDto)
  statements: {
    effect: string;
    actions: string[];
  }[];
*/
