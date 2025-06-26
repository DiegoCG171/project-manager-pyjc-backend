import { Injectable, NotFoundException } from '@nestjs/common';
import { Model } from 'mongoose';
import { InjectModel } from '@nestjs/mongoose';
import { Project } from './entities/project.entity';
import { CreateProjectDto } from './dto/create-project.dto';
import { UpdateProjectDto } from './dto/update-project.dto';
import { AreaService } from 'src/area/area.service';
import { LogService } from 'src/log/log.service';

@Injectable()
export class ProjectService {
  constructor(
    @InjectModel(Project.name)
    private readonly projectModel: Model<Project>,
    private readonly areaService: AreaService,
    private readonly logService: LogService,
  ) {}

  async create(createProjectDto: CreateProjectDto, userId: string) {
    try {
      const { id_area } = createProjectDto;
      const proyecto = await this.projectModel.create(createProjectDto);

      if (proyecto) {
        const area = await this.areaService.findOne(id_area);
        area.projects.push(proyecto._id);
        await this.areaService.update(id_area, { projects: area.projects });

        await this.logService.create({
          entityType: 'Project',
          action: 'CREATE',
          performedBy: userId,
          changes: Object.entries(createProjectDto).map(([prop, value]) => ({
            prop,
            previousValue: null,
            newValue: value,
          })),
        });
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

  async update(
    _id: string,
    updateProjectDto: UpdateProjectDto,
    userId: string,
  ) {
    try {
      //Obtiene el estado actual del proyecto
      const proyecto = await this.findOne(_id);
      const proyectoAnterior = { ...proyecto.toObject() };
      //Aplicar los cambios
      Object.assign(proyecto, updateProjectDto);

      //Registrar en log los cambios detectados
      const cambios = Object.entries(updateProjectDto).reduce(
        (acc, [key, nuevoValor]) => {
          const valorAnterior = proyectoAnterior[key];
          if (valorAnterior !== nuevoValor) {
            acc.push({
              prop: key,
              previousValue: valorAnterior,
              newValue: nuevoValor,
            });
          }
          return acc;
        },
        [],
      );

      if (cambios.length > 0) {
        await this.logService.create({
          entityType: 'Project',
          action: 'UPDATE',
          performedBy: userId,
          changes: cambios,
        });
      }

      return await this.projectModel.create(proyecto);
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
