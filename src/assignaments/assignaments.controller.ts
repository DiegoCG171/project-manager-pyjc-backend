import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { AssignamentsService } from './assignaments.service';
import { CreateAssignamentDto } from './dto/create-assignament.dto';
import { UpdateAssignamentDto } from './dto/update-assignament.dto';

@Controller('assignaments')
export class AssignamentsController {
  constructor(private readonly assignamentsService: AssignamentsService) {}

  @Post()
  create(@Body() createAssignamentDto: CreateAssignamentDto) {
    return this.assignamentsService.create(createAssignamentDto);
  }

  @Get()
  findAll() {
    return this.assignamentsService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.assignamentsService.findOne(id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateAssignamentDto: UpdateAssignamentDto) {
    return this.assignamentsService.update(id, updateAssignamentDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.assignamentsService.remove(id);
  }
}
