import { Inject, Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { InstructorStatus } from '@prisma/client';

interface CreateInstructorInput {
  name: string;
  phone: string;
  email?: string;
  specialty?: string;
}

interface UpdateInstructorInput {
  name?: string;
  phone?: string;
  email?: string;
  specialty?: string;
  status?: InstructorStatus;
}

@Injectable()
export class InstructorsService {
  constructor(@Inject(PrismaService) private readonly prisma: PrismaService) {}

  async list() {
    return this.prisma.instructor.findMany({ orderBy: { createdAt: 'desc' } });
  }

  async get(id: string) {
    const instructor = await this.prisma.instructor.findUnique({ where: { id } });
    if (!instructor) {
      throw new NotFoundException(`Instructor with ID ${id} not found`);
    }
    return instructor;
  }

  async create(input: CreateInstructorInput) {
    return this.prisma.instructor.create({
      data: {
        name: input.name,
        phone: input.phone,
        email: input.email,
        specialty: input.specialty,
      },
    });
  }

  async update(id: string, input: UpdateInstructorInput) {
    const instructor = await this.prisma.instructor.findUnique({ where: { id } });
    if (!instructor) {
      throw new NotFoundException(`Instructor with ID ${id} not found`);
    }
    return this.prisma.instructor.update({
      where: { id },
      data: {
        name: input.name,
        phone: input.phone,
        email: input.email,
        specialty: input.specialty,
        status: input.status,
      },
    });
  }

  async delete(id: string) {
    const instructor = await this.prisma.instructor.findUnique({ where: { id } });
    if (!instructor) {
      throw new NotFoundException(`Instructor with ID ${id} not found`);
    }
    await this.prisma.instructor.delete({ where: { id } });
    return { success: true };
  }
}


