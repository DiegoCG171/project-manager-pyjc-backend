import { Controller, Get, Post, Body, Patch, Param, Delete, Query } from '@nestjs/common';
import { StatusProjectService } from './status_project.service';
import { CreateStatusProjectDto } from './dto/create-status_project.dto';
import { UpdateStatusProjectDto } from './dto/update-status_project.dto';
import { PaginationQueryDto } from 'src/common/dto/pagination-query.dto';

@Controller('status-project')
export class StatusProjectController {
  constructor(private readonly statusProjectService: StatusProjectService) {}

  @Post()
  create(@Body() createStatusProjectDto: CreateStatusProjectDto) {
    return this.statusProjectService.create(createStatusProjectDto);
  }

  @Get()
  findAll(@Query() paginationQueryDto: PaginationQueryDto) {
    return this.statusProjectService.findAll(paginationQueryDto);
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.statusProjectService.findOne(id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateStatusProjectDto: UpdateStatusProjectDto) {
    return this.statusProjectService.update(id, updateStatusProjectDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.statusProjectService.remove(id);
  }
}
