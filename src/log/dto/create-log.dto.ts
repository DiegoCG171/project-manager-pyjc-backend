import {
  IsString,
  IsUUID,
  IsOptional,
  IsArray,
  ValidateNested,
} from 'class-validator';
import { Type } from 'class-transformer';

class Changes {
  @IsString()
  prop: string;

  @IsOptional()
  previusValue: any;

  @IsOptional()
  newValue: any;
}

export class CreateLogDto {
  @IsString()
  entityType: string;

  @IsString()
  action: string;

  @IsUUID()
  performedBy: string;

  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => Changes)
  changes: Changes[];
}
