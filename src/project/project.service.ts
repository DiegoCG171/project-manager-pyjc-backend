import { Injectable, NotFoundException } from '@nestjs/common';
import { Model } from 'mongoose';
import { InjectModel } from '@nestjs/mongoose';
import { Project } from './entities/project.entity';
import { CreateProjectDto } from './dto/create-project.dto';
import { UpdateProjectDto } from './dto/update-project.dto';
import { AreaService } from 'src/area/area.service';
import { LogService } from 'src/log/log.service';
import { User } from 'src/user/entities/user.entity';

@Injectable()
export class ProjectService {
  constructor(
    @InjectModel(Project.name)
    private readonly projectModel: Model<Project>,
    private readonly areaService: AreaService,
    private readonly logService: LogService,
  ) {}

  async create(createProjectDto: CreateProjectDto, user: User) {
    try {
      
      const { id_area } = createProjectDto;
      const proyect = await this.projectModel.create(createProjectDto);

      if (proyect) {
        const area = await this.areaService.findOne(id_area);
        area.projects.push(proyect._id);
        await this.areaService.update(id_area, { projects: area.projects });

        await this.logService.create({
          entityType: 'Project',
          action: 'CREATE',
          performedBy: user._id,
          changes: Object.entries(createProjectDto).map(([prop, value]) => ({
            prop,
            previousValue: null,
            newValue: value,
          })),
        });
      }
      return proyect;
      
    } catch (error) {
      console.error(error)
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

  async update(
    _id: string,
    updateProjectDto: UpdateProjectDto,
    user: User,
  ) {
    try {
      const proyect = await this.findOne(_id);
      const lastValuesProject = { ...proyect.toObject() };
      Object.assign(proyect, updateProjectDto);

      const changes = Object.entries(updateProjectDto).reduce(
        (actions, [key, newValue]) => {
          const previousValue = lastValuesProject[key];
          if (previousValue !== newValue) {
            actions.push({
              prop: key,
              previousValue,
              newValue
            });
          }
          return actions;
        },
        [],
      );

      if (changes.length > 0) {
        await this.logService.create({
          entityType: 'Project',
          action: 'UPDATE',
          performedBy: user._id,
          changes: changes,
        });
      }

      return await this.projectModel.create(proyect);
    } catch (error) {
      throw error;
    }
  }

  async remove(_id: string) {
    try {
      const proyecto = await this.findOne(_id);
      await this.projectModel.deleteOne({ _id: proyecto._id });
      /*
          await this.logService.create({
      entityType: 'Project',
      action: 'DELETE',
      performedBy: userId,
      changes: [
        {
          prop: 'Proyecto eliminado',
          previousValue: proyecto,
          newValue: null,
        },
      ],
    });
      */
      return {
        message: `El proyecto con id ${proyecto._id} se elimino corectamente`,
      };
    } catch (error) {
      throw error;
    }
  }
}
