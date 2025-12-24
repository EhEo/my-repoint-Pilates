import { Body, Controller, Delete, Get, Inject, Param, Post, Put, UseGuards } from '@nestjs/common';
import { InstructorsService } from './instructors.service';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';
import { Roles } from '../auth/roles/roles.decorator';
import { RolesGuard } from '../auth/roles/roles.guard';
import { InstructorStatus } from '@prisma/client';

interface CreateInstructorDto {
  name: string;
  phone: string;
  email?: string;
  specialty?: string;
}

interface UpdateInstructorDto {
  name?: string;
  phone?: string;
  email?: string;
  specialty?: string;
  status?: InstructorStatus;
}

@UseGuards(JwtAuthGuard, RolesGuard)
@Roles('admin')
@Controller('instructors')
export class InstructorsController {
  constructor(@Inject(InstructorsService) private readonly instructorsService: InstructorsService) {}

  @Get()
  list() {
    return this.instructorsService.list();
  }

  @Get(':id')
  get(@Param('id') id: string) {
    return this.instructorsService.get(id);
  }

  @Post()
  create(@Body() body: CreateInstructorDto) {
    return this.instructorsService.create(body);
  }

  @Put(':id')
  update(@Param('id') id: string, @Body() body: UpdateInstructorDto) {
    return this.instructorsService.update(id, body);
  }

  @Delete(':id')
  delete(@Param('id') id: string) {
    return this.instructorsService.delete(id);
  }
}


