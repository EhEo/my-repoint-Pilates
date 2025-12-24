import { Inject, Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { ClassType } from '@prisma/client';

interface CreateClassInput {
  name: string;
  type: ClassType;
  maxCapacity: number;
  durationMin: number;
  instructorId?: string;
  level?: string;
  equipment?: string;
}

interface UpdateClassInput {
  name?: string;
  type?: ClassType;
  maxCapacity?: number;
  durationMin?: number;
  instructorId?: string | null;
  level?: string;
  equipment?: string;
}

@Injectable()
export class ClassesService {
  constructor(@Inject(PrismaService) private readonly prisma: PrismaService) {}

  async list() {
    return this.prisma.class.findMany({
      orderBy: { createdAt: 'desc' },
      include: { instructor: true },
    });
  }

  async get(id: string) {
    const classItem = await this.prisma.class.findUnique({
      where: { id },
      include: { instructor: true, schedules: true },
    });
    if (!classItem) {
      throw new NotFoundException(`Class with ID ${id} not found`);
    }
    return classItem;
  }

  async create(input: CreateClassInput) {
    return this.prisma.class.create({
      data: {
        name: input.name,
        type: input.type,
        maxCapacity: input.maxCapacity,
        durationMin: input.durationMin,
        instructorId: input.instructorId,
        level: input.level,
        equipment: input.equipment,
      },
      include: { instructor: true },
    });
  }

  async update(id: string, input: UpdateClassInput) {
    const classItem = await this.prisma.class.findUnique({ where: { id } });
    if (!classItem) {
      throw new NotFoundException(`Class with ID ${id} not found`);
    }
    return this.prisma.class.update({
      where: { id },
      data: {
        name: input.name,
        type: input.type,
        maxCapacity: input.maxCapacity,
        durationMin: input.durationMin,
        instructorId: input.instructorId,
        level: input.level,
        equipment: input.equipment,
      },
      include: { instructor: true },
    });
  }

  async delete(id: string) {
    const classItem = await this.prisma.class.findUnique({ where: { id } });
    if (!classItem) {
      throw new NotFoundException(`Class with ID ${id} not found`);
    }
    await this.prisma.class.delete({ where: { id } });
    return { success: true };
  }
}
