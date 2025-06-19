import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { PlataformService } from './plataform.service';
import { CreatePlataformDto } from './dto/create-plataform.dto';
import { UpdatePlataformDto } from './dto/update-plataform.dto';

@Controller('plataform')
export class PlataformController {
  constructor(private readonly plataformService: PlataformService) {}

  @Post()
  create(@Body() createPlataformDto: CreatePlataformDto) {
    return this.plataformService.create(createPlataformDto);
  }

  @Get()
  findAll() {
    return this.plataformService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.plataformService.findOne(id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updatePlataformDto: UpdatePlataformDto) {
    return this.plataformService.update(id, updatePlataformDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.plataformService.remove(id);
  }
}
