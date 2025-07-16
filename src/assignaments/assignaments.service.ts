import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateAssignamentDto } from './dto/create-assignament.dto';
import { UpdateAssignamentDto } from './dto/update-assignament.dto';
import { InjectModel } from '@nestjs/mongoose';
import { Assignament } from './entities/assignament.entity';
import { Model } from 'mongoose';
import { ProjectService } from 'src/project/project.service';
import { User } from 'src/user/entities/user.entity';
import { UserService } from 'src/user/user.service';
import { StatusAssignamentService } from 'src/status_assignament/status_assignament.service';
import { PlataformService } from 'src/plataform/plataform.service';

@Injectable()
export class AssignamentsService {
  constructor(
    @InjectModel(Assignament.name)
    private readonly assignamentModel: Model<Assignament>,
    private readonly projectService: ProjectService,
    private readonly userService: UserService,
    private readonly statusService: StatusAssignamentService,
    private readonly platformService: PlataformService
  ) {}
  async create(createAssignamentDto: CreateAssignamentDto, user: User) {
    try {
      const { id_project } = createAssignamentDto;
      // const {id_user} = createAssignamentDto;
      // const {id_status} = createAssignamentDto;
      // const {id_plataform} = createAssignamentDto;

      const assignament = await this.assignamentModel.create(createAssignamentDto);
      if (assignament) {
        const project = await this.projectService.findOne(id_project);
        // const userr = await this.userService.findOne(id_user);
        // const status = await this.statusService.findOne(id_status);
        // const plataform = await this.platformService.findOne(id_plataform);

        project.assignaments.push(assignament._id);
        await this.projectService.update(
          id_project,
          { assignaments: project.assignaments },
          user
        );
      }
      return assignament;
    } catch (error) {
      throw error;
    }
  }

  async findAll() {
    try {
      const assignament = await this.assignamentModel.find().exec();
      return assignament;
    } catch (error) {
      throw error;
    }
  }

  async findOne(_id: string) {
    try {
      const assignament = await this.assignamentModel.findOne({ _id }).exec();
      if (!assignament) {
        throw new NotFoundException(`El assignament con id ${_id} no existe`);
      }
      const project = await this.projectService.findOne(assignament.id_project);
      const userr = await this.userService.findOne(assignament.id_user);
      const status = await this.statusService.findOne(assignament.id_status);
      const plataform = await this.platformService.findOne(assignament.id_plataform);
      return {
        ...assignament.toObject(),
        project,
        userr,
        status,
        plataform
      };
    } catch (error) {
      throw error;
    }
  }

  async update(id: string, updateAssignamentDto: UpdateAssignamentDto) {
    try {
      const assignament = await this.findOne(id);
      Object.assign(assignament, updateAssignamentDto);
      return await this.assignamentModel.create(assignament);
    } catch (error) {
      throw error;
    }
  }

  async remove(_id: string) {
    try {
      const assignament = await this.findOne(_id);
      await this.assignamentModel.deleteOne({ _id: assignament._id });
      return {
        message: `El assignament con id ${assignament._id} se elimino correctamente`,
      };
    } catch (error) {
      throw error;
    }
  }
}