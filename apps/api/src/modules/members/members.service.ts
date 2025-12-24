import { Inject, Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { MemberStatus } from '@prisma/client';

interface CreateMemberInput {
  name: string;
  phone: string;
  email?: string;
  birthDate?: string;
  gender?: string;
  memo?: string;
}

interface UpdateMemberInput {
  name?: string;
  phone?: string;
  email?: string;
  birthDate?: string;
  gender?: string;
  status?: MemberStatus;
  memo?: string;
}

@Injectable()
export class MembersService {
  constructor(@Inject(PrismaService) private readonly prisma: PrismaService) {}

  async list() {
    return this.prisma.member.findMany({
      orderBy: { createdAt: 'desc' },
      include: {
        memberships: {
          where: { status: 'active' },
          orderBy: { createdAt: 'desc' },
          take: 1,
        },
      },
    });
  }

  async get(id: string) {
    const member = await this.prisma.member.findUnique({
      where: { id },
      include: {
        memberships: {
          orderBy: { createdAt: 'desc' },
        },
      },
    });
    if (!member) {
      throw new NotFoundException(`Member with ID ${id} not found`);
    }
    return member;
  }

  async create(input: CreateMemberInput) {
    return this.prisma.member.create({
      data: {
        name: input.name,
        phone: input.phone,
        email: input.email,
        birthDate: input.birthDate ? new Date(input.birthDate) : undefined,
        gender: input.gender,
        memo: input.memo,
      },
    });
  }

  async update(id: string, input: UpdateMemberInput) {
    const member = await this.prisma.member.findUnique({ where: { id } });
    if (!member) {
      throw new NotFoundException(`Member with ID ${id} not found`);
    }
    return this.prisma.member.update({
      where: { id },
      data: {
        name: input.name,
        phone: input.phone,
        email: input.email,
        birthDate: input.birthDate ? new Date(input.birthDate) : undefined,
        gender: input.gender,
        status: input.status,
        memo: input.memo,
      },
    });
  }

  async delete(id: string) {
    const member = await this.prisma.member.findUnique({ where: { id } });
    if (!member) {
      throw new NotFoundException(`Member with ID ${id} not found`);
    }
    await this.prisma.member.delete({ where: { id } });
    return { success: true };
  }
}


