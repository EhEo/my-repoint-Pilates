import { Inject, Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { ReservationStatus } from '@prisma/client';

interface CreateReservationInput {
  memberId: string;
  scheduleId: string;
}

interface UpdateReservationInput {
  status?: ReservationStatus;
}

@Injectable()
export class ReservationsService {
  constructor(@Inject(PrismaService) private readonly prisma: PrismaService) {}

  async list() {
    return this.prisma.reservation.findMany({
      orderBy: { reservedAt: 'desc' },
      include: {
        member: true,
        schedule: {
          include: { class: true, instructor: true },
        },
      },
    });
  }

  async get(id: string) {
    const reservation = await this.prisma.reservation.findUnique({
      where: { id },
      include: {
        member: true,
        schedule: {
          include: { class: true, instructor: true },
        },
      },
    });
    if (!reservation) {
      throw new NotFoundException(`Reservation with ID ${id} not found`);
    }
    return reservation;
  }

  async create(input: CreateReservationInput) {
    return this.prisma.reservation.create({
      data: {
        memberId: input.memberId,
        scheduleId: input.scheduleId,
        status: 'confirmed',
      },
      include: {
        member: true,
        schedule: {
          include: { class: true, instructor: true },
        },
      },
    });
  }

  async update(id: string, input: UpdateReservationInput) {
    const reservation = await this.prisma.reservation.findUnique({ where: { id } });
    if (!reservation) {
      throw new NotFoundException(`Reservation with ID ${id} not found`);
    }

    const data: {
      status?: ReservationStatus;
      cancelledAt?: Date;
      attendedAt?: Date;
    } = {};

    if (input.status) {
      data.status = input.status;
      if (input.status === 'cancelled') {
        data.cancelledAt = new Date();
      } else if (input.status === 'attended') {
        data.attendedAt = new Date();
      }
    }

    return this.prisma.reservation.update({
      where: { id },
      data,
      include: {
        member: true,
        schedule: {
          include: { class: true, instructor: true },
        },
      },
    });
  }

  async delete(id: string) {
    const reservation = await this.prisma.reservation.findUnique({ where: { id } });
    if (!reservation) {
      throw new NotFoundException(`Reservation with ID ${id} not found`);
    }
    await this.prisma.reservation.delete({ where: { id } });
    return { success: true };
  }
}
