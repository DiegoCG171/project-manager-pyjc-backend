import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { UserService } from './user.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';

@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Post()
  create(@Body() createUserDto: CreateUserDto) {
    return this.userService.create(createUserDto);
  }

  @Get()
  findAll() {
    return this.userService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
<<<<<<< HEAD
    return this.userService.findOne(+id);
=======
    return this.userService.findOne(id);
>>>>>>> d0ecd81679f054a592ada54fa031e2c2d17fb8b3
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateUserDto: UpdateUserDto) {
<<<<<<< HEAD
    return this.userService.update(+id, updateUserDto);
=======
    return this.userService.update(id, updateUserDto);
>>>>>>> d0ecd81679f054a592ada54fa031e2c2d17fb8b3
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
<<<<<<< HEAD
    return this.userService.remove(+id);
  }
=======
    return this.userService.remove(id);}

>>>>>>> d0ecd81679f054a592ada54fa031e2c2d17fb8b3
}
