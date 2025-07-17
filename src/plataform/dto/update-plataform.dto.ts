import { PartialType } from '@nestjs/mapped-types';
import { CreatePlataformDto } from './create-plataform.dto';

export class UpdatePlataformDto extends PartialType(CreatePlataformDto) {}
