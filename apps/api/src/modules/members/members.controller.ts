import { Body, Controller, Delete, Get, Inject, Param, Post, Put, UseGuards } from '@nestjs/common';
import { MembersService } from './members.service';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';
import { Roles } from '../auth/roles/roles.decorator';
import { RolesGuard } from '../auth/roles/roles.guard';
import { MemberStatus } from '@prisma/client';

interface CreateMemberDto {
  name: string;
  phone: string;
  email?: string;
  birthDate?: string;
  gender?: string;
  memo?: string;
}

interface UpdateMemberDto {
  name?: string;
  phone?: string;
  email?: string;
  birthDate?: string;
  gender?: string;
  status?: MemberStatus;
  memo?: string;
}

@UseGuards(JwtAuthGuard, RolesGuard)
@Roles('admin')
@Controller('members')
export class MembersController {
  constructor(@Inject(MembersService) private readonly membersService: MembersService) {}

  @Get()
  list() {
    return this.membersService.list();
  }

  @Get(':id')
  get(@Param('id') id: string) {
    return this.membersService.get(id);
  }

  @Post()
  create(@Body() body: CreateMemberDto) {
    return this.membersService.create(body);
  }

  @Put(':id')
  update(@Param('id') id: string, @Body() body: UpdateMemberDto) {
    return this.membersService.update(id, body);
  }

  @Delete(':id')
  delete(@Param('id') id: string) {
    return this.membersService.delete(id);
  }
}


