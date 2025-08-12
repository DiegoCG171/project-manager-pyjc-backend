import { Injectable, NotFoundException } from '@nestjs/common';
import { Model } from 'mongoose';
import { InjectModel } from '@nestjs/mongoose';
import { Project } from './entities/project.entity';
import { CreateProjectDto } from './dto/create-project.dto';
import { UpdateProjectDto } from './dto/update-project.dto';
import { AreaService } from 'src/area/area.service';
import { LogService } from 'src/log/log.service';
import { User } from 'src/user/entities/user.entity';
import { Order, PaginationQueryDto } from 'src/common/dto/pagination-query.dto';
import { PaginationResult } from 'src/common/interface/pagination-result.interface';

@Injectable()
export class ProjectService {
  constructor(
    @InjectModel(Project.name)
    private readonly projectModel: Model<Project>,
    private readonly logService: LogService,
  ) { }

  async create(createProjectDto: CreateProjectDto, user: User) {
    try {
      const proyect = await this.projectModel.create(createProjectDto);

      if (proyect) {

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

  async findAll(paginationQueryDto: PaginationQueryDto): Promise<PaginationResult<Project>> {
    const { limit=10, page, order, sortBy } = paginationQueryDto;
    try {
      const projects = await this.projectModel.find().limit(limit).skip((page - 1) * limit).sort({ [sortBy]: order === Order.ASC ? 1 : -1 }).select('-__v').exec();
      const totalproyects = await this.projectModel.countDocuments().exec();
      return {
        data: projects,
        limit,
        page,
        totalPages: Math.ceil(totalproyects / limit),
        total: totalproyects
        // currentPage:0
      };
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
