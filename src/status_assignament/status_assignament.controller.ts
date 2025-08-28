import { Controller, Get, Post, Body, Patch, Param, Delete, Query } from '@nestjs/common';
import { StatusAssignamentService } from './status_assignament.service';
import { CreateStatusAssignamentDto } from './dto/create-status_assignament.dto';
import { UpdateStatusAssignamentDto } from './dto/update-status_assignament.dto';
import { PaginationQueryDto } from 'src/common/dto/pagination-query.dto';

@Controller('status-assignament')
export class StatusAssignamentController {
  constructor(private readonly statusAssignamentService: StatusAssignamentService) {}

  @Post()
  create(@Body() createStatusAssignamentDto: CreateStatusAssignamentDto) {
    return this.statusAssignamentService.create(createStatusAssignamentDto);
  }

  @Get()
  findAll(@Query() paginationQueryDto: PaginationQueryDto) {
    return this.statusAssignamentService.findAll(paginationQueryDto);
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.statusAssignamentService.findOne(id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateStatusAssignamentDto: UpdateStatusAssignamentDto) {
    return this.statusAssignamentService.update(id, updateStatusAssignamentDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.statusAssignamentService.remove(id);
  }
}
