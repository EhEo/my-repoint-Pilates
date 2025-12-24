import { Inject, Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { MembershipStatus, MembershipType } from '@prisma/client';

interface CreateMembershipInput {
  memberId: string;
  type: MembershipType;
  startDate: string;
  endDate?: string;
  totalCount?: number;
  remainingCount?: number;
}

interface UpdateMembershipInput {
  type?: MembershipType;
  startDate?: string;
  endDate?: string;
  totalCount?: number;
  remainingCount?: number;
  status?: MembershipStatus;
}

@Injectable()
export class MembershipsService {
  constructor(@Inject(PrismaService) private readonly prisma: PrismaService) {}

  async list() {
    return this.prisma.membership.findMany({
      orderBy: { createdAt: 'desc' },
      include: { member: true },
    });
  }

  async get(id: string) {
    const membership = await this.prisma.membership.findUnique({
      where: { id },
      include: { member: true },
    });
    if (!membership) {
      throw new NotFoundException(`Membership with ID ${id} not found`);
    }
    return membership;
  }

  async create(input: CreateMembershipInput) {
    return this.prisma.membership.create({
      data: {
        memberId: input.memberId,
        type: input.type,
        startDate: new Date(input.startDate),
        endDate: input.endDate ? new Date(input.endDate) : undefined,
        totalCount: input.totalCount,
        remainingCount: input.remainingCount ?? input.totalCount,
      },
      include: { member: true },
    });
  }

  async update(id: string, input: UpdateMembershipInput) {
    const membership = await this.prisma.membership.findUnique({ where: { id } });
    if (!membership) {
      throw new NotFoundException(`Membership with ID ${id} not found`);
    }
    return this.prisma.membership.update({
      where: { id },
      data: {
        type: input.type,
        startDate: input.startDate ? new Date(input.startDate) : undefined,
        endDate: input.endDate ? new Date(input.endDate) : undefined,
        totalCount: input.totalCount,
        remainingCount: input.remainingCount,
        status: input.status,
      },
      include: { member: true },
    });
  }

  async delete(id: string) {
    const membership = await this.prisma.membership.findUnique({ where: { id } });
    if (!membership) {
      throw new NotFoundException(`Membership with ID ${id} not found`);
    }
    await this.prisma.membership.delete({ where: { id } });
    return { success: true };
  }
}


