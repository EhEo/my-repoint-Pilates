import { Body, Controller, Delete, Get, Inject, Param, Post, Put, UseGuards } from '@nestjs/common';
import { ClassesService } from './classes.service';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';
import { Roles } from '../auth/roles/roles.decorator';
import { RolesGuard } from '../auth/roles/roles.guard';
import { ClassType } from '@prisma/client';

interface CreateClassDto {
  name: string;
  type: ClassType;
  maxCapacity: number;
  durationMin: number;
  instructorId?: string;
  level?: string;
  equipment?: string;
}

interface UpdateClassDto {
  name?: string;
  type?: ClassType;
  maxCapacity?: number;
  durationMin?: number;
  instructorId?: string | null;
  level?: string;
  equipment?: string;
}

@UseGuards(JwtAuthGuard, RolesGuard)
@Roles('admin')
@Controller('classes')
export class ClassesController {
  constructor(@Inject(ClassesService) private readonly classesService: ClassesService) {}

  @Get()
  list() {
    return this.classesService.list();
  }

  @Get(':id')
  get(@Param('id') id: string) {
    return this.classesService.get(id);
  }

  @Post()
  create(@Body() body: CreateClassDto) {
    return this.classesService.create(body);
  }

  @Put(':id')
  update(@Param('id') id: string, @Body() body: UpdateClassDto) {
    return this.classesService.update(id, body);
  }

  @Delete(':id')
  delete(@Param('id') id: string) {
    return this.classesService.delete(id);
  }
}
