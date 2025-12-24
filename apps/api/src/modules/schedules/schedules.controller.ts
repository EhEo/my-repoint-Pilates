import { Body, Controller, Delete, Get, Inject, Param, Post, Put, UseGuards } from '@nestjs/common';
import { SchedulesService } from './schedules.service';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';
import { Roles } from '../auth/roles/roles.decorator';
import { RolesGuard } from '../auth/roles/roles.guard';
import { ScheduleStatus } from '@prisma/client';

interface CreateScheduleDto {
  classId: string;
  instructorId?: string;
  startTime: string;
  endTime: string;
}

interface UpdateScheduleDto {
  classId?: string;
  instructorId?: string | null;
  startTime?: string;
  endTime?: string;
  status?: ScheduleStatus;
}

@UseGuards(JwtAuthGuard, RolesGuard)
@Roles('admin')
@Controller('schedules')
export class SchedulesController {
  constructor(@Inject(SchedulesService) private readonly schedulesService: SchedulesService) {}

  @Get()
  list() {
    return this.schedulesService.list();
  }

  @Get(':id')
  get(@Param('id') id: string) {
    return this.schedulesService.get(id);
  }

  @Post()
  create(@Body() body: CreateScheduleDto) {
    return this.schedulesService.create(body);
  }

  @Put(':id')
  update(@Param('id') id: string, @Body() body: UpdateScheduleDto) {
    return this.schedulesService.update(id, body);
  }

  @Delete(':id')
  delete(@Param('id') id: string) {
    return this.schedulesService.delete(id);
  }
}
