import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { AssignamentsService } from './assignaments.service';
import { CreateAssignamentDto } from './dto/create-assignament.dto';
import { UpdateAssignamentDto } from './dto/update-assignament.dto';
import { GetUser } from 'src/auth/decorators/get-user.decorator';
import { User } from 'src/user/entities/user.entity';
import { AuthJwt } from 'src/auth/decorators/auth-jwt.decorator';

@Controller('assignaments')
export class AssignamentsController {
  constructor(private readonly assignamentsService: AssignamentsService) {}

  @Post()
  @AuthJwt()
  create(@Body() createAssignamentDto: CreateAssignamentDto, @GetUser() user: User) {
    return this.assignamentsService.create(createAssignamentDto, user);
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
