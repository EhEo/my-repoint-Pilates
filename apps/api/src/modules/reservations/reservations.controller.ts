import { Body, Controller, Delete, Get, Inject, Param, Post, Put, UseGuards } from '@nestjs/common';
import { ReservationsService } from './reservations.service';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';
import { Roles } from '../auth/roles/roles.decorator';
import { RolesGuard } from '../auth/roles/roles.guard';
import { ReservationStatus } from '@prisma/client';

interface CreateReservationDto {
  memberId: string;
  scheduleId: string;
}

interface UpdateReservationDto {
  status?: ReservationStatus;
}

@UseGuards(JwtAuthGuard, RolesGuard)
@Roles('admin')
@Controller('reservations')
export class ReservationsController {
  constructor(@Inject(ReservationsService) private readonly reservationsService: ReservationsService) {}

  @Get()
  list() {
    return this.reservationsService.list();
  }

  @Get(':id')
  get(@Param('id') id: string) {
    return this.reservationsService.get(id);
  }

  @Post()
  create(@Body() body: CreateReservationDto) {
    return this.reservationsService.create(body);
  }

  @Put(':id')
  update(@Param('id') id: string, @Body() body: UpdateReservationDto) {
    return this.reservationsService.update(id, body);
  }

  @Delete(':id')
  delete(@Param('id') id: string) {
    return this.reservationsService.delete(id);
  }
}
