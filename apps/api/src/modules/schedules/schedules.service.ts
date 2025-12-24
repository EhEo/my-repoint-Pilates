import { Inject, Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { ScheduleStatus } from '@prisma/client';

interface CreateScheduleInput {
  classId: string;
  instructorId?: string;
  startTime: string;
  endTime: string;
}

interface UpdateScheduleInput {
  classId?: string;
  instructorId?: string | null;
  startTime?: string;
  endTime?: string;
  status?: ScheduleStatus;
}

@Injectable()
export class SchedulesService {
  constructor(@Inject(PrismaService) private readonly prisma: PrismaService) {}

  async list() {
    return this.prisma.schedule.findMany({
      orderBy: { startTime: 'asc' },
      include: {
        class: true,
        instructor: true,
        reservations: {
          where: {
            status: { in: ['confirmed', 'attended'] },
          },
        },
      },
    });
  }

  async get(id: string) {
    const schedule = await this.prisma.schedule.findUnique({
      where: { id },
      include: {
        class: true,
        instructor: true,
        reservations: {
          include: { member: true },
        },
      },
    });
    if (!schedule) {
      throw new NotFoundException(`Schedule with ID ${id} not found`);
    }
    return schedule;
  }

  async create(input: CreateScheduleInput) {
    return this.prisma.schedule.create({
      data: {
        classId: input.classId,
        instructorId: input.instructorId,
        startTime: new Date(input.startTime),
        endTime: new Date(input.endTime),
      },
      include: {
        class: true,
        instructor: true,
      },
    });
  }

  async update(id: string, input: UpdateScheduleInput) {
    const schedule = await this.prisma.schedule.findUnique({ where: { id } });
    if (!schedule) {
      throw new NotFoundException(`Schedule with ID ${id} not found`);
    }
    return this.prisma.schedule.update({
      where: { id },
      data: {
        classId: input.classId,
        instructorId: input.instructorId,
        startTime: input.startTime ? new Date(input.startTime) : undefined,
        endTime: input.endTime ? new Date(input.endTime) : undefined,
        status: input.status,
      },
      include: {
        class: true,
        instructor: true,
      },
    });
  }

  async delete(id: string) {
    const schedule = await this.prisma.schedule.findUnique({ where: { id } });
    if (!schedule) {
      throw new NotFoundException(`Schedule with ID ${id} not found`);
    }
    await this.prisma.schedule.delete({ where: { id } });
    return { success: true };
  }
}
