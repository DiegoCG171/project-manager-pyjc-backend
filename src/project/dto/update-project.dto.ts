import { PartialType } from '@nestjs/mapped-types';
import { CreateProyectoDto } from './create-project.dto';

export class UpdateProyectoDto extends PartialType(CreateProyectoDto) {}
