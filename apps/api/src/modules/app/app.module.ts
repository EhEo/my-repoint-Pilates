import { Module } from '@nestjs/common';
import { HealthModule } from '../health/health.module';
import { PrismaModule } from '../prisma/prisma.module';
import { AuthModule } from '../auth/auth.module';
import { MembersModule } from '../members/members.module';
import { MembershipsModule } from '../memberships/memberships.module';
import { ClassesModule } from '../classes/classes.module';
import { SchedulesModule } from '../schedules/schedules.module';
import { ReservationsModule } from '../reservations/reservations.module';
import { InstructorsModule } from '../instructors/instructors.module';

@Module({
  imports: [
    PrismaModule,
    HealthModule,
    AuthModule,
    MembersModule,
    MembershipsModule,
    ClassesModule,
    SchedulesModule,
    ReservationsModule,
    InstructorsModule,
  ],
})
export class AppModule {}


