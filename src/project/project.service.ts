import { Injectable, NotFoundException } from '@nestjs/common';
import { Model } from 'mongoose';
import { InjectModel } from '@nestjs/mongoose';
import { Project } from './entities/project.entity';
import { CreateProjectDto } from './dto/create-project.dto';
import { UpdateProjectDto } from './dto/update-project.dto';
import { AreaService } from 'src/area/area.service';

@Injectable()
export class ProjectService {
  constructor(
    @InjectModel(Project.name)
<<<<<<< HEAD
    private readonly projectModel: Model<Project>,
  ) {}
=======
    private readonly projectModel:Model<Project>,
    private readonly areaService:AreaService
  ){}
>>>>>>> 4079645bdc28f8a8cdbad9c5a8bd9b2eddbd5cb9
  async create(createProjectDto: CreateProjectDto) {
    try {
      const {id_area}=createProjectDto;
      const proyecto = await this.projectModel.create(createProjectDto);
      if (proyecto) {
        const area = await this.areaService.findOne(id_area);
        area.projects.push(proyecto._id);
        await this.areaService.update(id_area,{ projects:area.projects})
      }
      return proyecto;
    } catch (error) {
      throw error;
    }
  }

  async findAll() {
    try {
      const proyecto = await this.projectModel.find().exec();
      return proyecto;
    } catch (error) {
      throw error;
    }
  }

  async findOne(_id: string) {
    try {
      const proyecto = await this.projectModel.findOne({ _id }).exec();
      if (!proyecto) {
        throw new NotFoundException(`El proyecto con id ${_id} no existe`);
      }
      return proyecto;
    } catch (error) {
      throw error;
    }
  }

  async update(_id: string, updateProjectDto: UpdateProjectDto) {
    try {
      const proyecto = await this.findOne(_id);
      Object.assign(proyecto, updateProjectDto);
      return await this.projectModel.create(proyecto);
    } catch (error) {
      throw error;
    }
  }

  async remove(_id: string) {
    try {
      const proyecto = await this.findOne(_id);
      await this.projectModel.deleteOne({ _id: proyecto._id });
      return {
        message: `El proyecto con id ${proyecto._id} se elimino corectamente`,
      };
    } catch (error) {
      throw error;
    }
  }
}
