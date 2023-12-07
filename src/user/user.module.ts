import { Module, forwardRef } from '@nestjs/common';
import { UserService } from './user.service';
import { UserController } from './user.controller';

import User from './entities/user.entity';
import { ApplicationsModule } from 'src/applications/applications.module';
import { RolesModule } from 'src/roles/roles.module';

import { TypeOrmModule } from '@nestjs/typeorm';

@Module({
  imports: [
    TypeOrmModule.forFeature([User]),
    forwardRef(() => ApplicationsModule),
    forwardRef(() => RolesModule),
  ],
  controllers: [UserController],
  providers: [UserService],
  exports: [UserService],
})
export class UserModule {}
