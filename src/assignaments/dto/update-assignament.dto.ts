import { PartialType } from '@nestjs/mapped-types';
import { CreateAssignamentDto } from './create-assignament.dto';

export class UpdateAssignamentDto extends PartialType(CreateAssignamentDto) {}
