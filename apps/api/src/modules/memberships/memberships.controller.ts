import { Body, Controller, Delete, Get, Inject, Param, Post, Put, UseGuards } from '@nestjs/common';
import { MembershipsService } from './memberships.service';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';
import { Roles } from '../auth/roles/roles.decorator';
import { RolesGuard } from '../auth/roles/roles.guard';
import { MembershipStatus, MembershipType } from '@prisma/client';

interface CreateMembershipDto {
  memberId: string;
  type: MembershipType;
  startDate: string;
  endDate?: string;
  totalCount?: number;
  remainingCount?: number;
}

interface UpdateMembershipDto {
  type?: MembershipType;
  startDate?: string;
  endDate?: string;
  totalCount?: number;
  remainingCount?: number;
  status?: MembershipStatus;
}

@UseGuards(JwtAuthGuard, RolesGuard)
@Roles('admin')
@Controller('memberships')
export class MembershipsController {
  constructor(@Inject(MembershipsService) private readonly membershipsService: MembershipsService) {}

  @Get()
  list() {
    return this.membershipsService.list();
  }

  @Get(':id')
  get(@Param('id') id: string) {
    return this.membershipsService.get(id);
  }

  @Post()
  create(@Body() body: CreateMembershipDto) {
    return this.membershipsService.create(body);
  }

  @Put(':id')
  update(@Param('id') id: string, @Body() body: UpdateMembershipDto) {
    return this.membershipsService.update(id, body);
  }

  @Delete(':id')
  delete(@Param('id') id: string) {
    return this.membershipsService.delete(id);
  }
}


