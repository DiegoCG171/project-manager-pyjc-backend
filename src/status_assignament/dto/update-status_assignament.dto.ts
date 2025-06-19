import { PartialType } from '@nestjs/mapped-types';
import { CreateStatusAssignamentDto } from './create-status_assignament.dto';

export class UpdateStatusAssignamentDto extends PartialType(CreateStatusAssignamentDto) {}
