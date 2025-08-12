import { Controller, Get, Post, Body, Patch, Param, Delete, Query } from '@nestjs/common';
import { ProjectService} from './project.service';
import { CreateProjectDto } from './dto/create-project.dto';
import { UpdateProjectDto } from './dto/update-project.dto';
import { GetUser } from 'src/auth/decorators/get-user.decorator';
import { User } from 'src/user/entities/user.entity';
import { AuthJwt } from 'src/auth/decorators/auth-jwt.decorator';
import { PaginationQueryDto } from 'src/common/dto/pagination-query.dto';

@Controller('project')
export class ProjectController {
  constructor(private readonly projectService: ProjectService) {}

  @Post()
  @AuthJwt()
  create(@Body() createprojectDto: CreateProjectDto, @GetUser() user: User) {
    return this.projectService.create(createprojectDto, user);
  }

  @Get()
  findAll(
    @Query() paginationQueryDto: PaginationQueryDto
  ) {
    return this.projectService.findAll(paginationQueryDto);
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.projectService.findOne(id);
  }

  @Patch(':id')
  @AuthJwt()
  update(@Param('id') id: string, @Body() updateProjectDto: UpdateProjectDto, @GetUser() user: User) {
    return this.projectService.update(id, updateProjectDto, user);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.projectService.remove(id);
  }
}
