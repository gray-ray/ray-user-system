import { Module, forwardRef } from '@nestjs/common';
import { RolesService } from './roles.service';
import { RolesController } from './roles.controller';

import Role from './entities/role.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { PermissionsModule } from 'src/permissions/permissions.module';
import { ApplicationsModule } from 'src/applications/applications.module';

@Module({
  imports: [
    TypeOrmModule.forFeature([Role]),
    PermissionsModule,
    forwardRef(() => ApplicationsModule),
  ],
  controllers: [RolesController],
  providers: [RolesService],
  exports: [RolesService],
})
export class RolesModule {}
