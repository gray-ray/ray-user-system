import { Module, forwardRef } from '@nestjs/common';
import { ApplicationsService } from './applications.service';
import { ApplicationsController } from './applications.controller';

import Application from './entities/application.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { RolesModule } from 'src/roles/roles.module';
import { UserModule } from 'src/user/user.module';

// https://docs.nestjs.com/fundamentals/circular-dependency
// forwardRef 相互依赖问题解决
// NOTE: service  module 都需要配置
@Module({
  imports: [
    TypeOrmModule.forFeature([Application]),
    forwardRef(() => RolesModule),
    forwardRef(() => UserModule),
  ],
  controllers: [ApplicationsController],
  providers: [ApplicationsService],
  exports: [ApplicationsService],
})
export class ApplicationsModule {}
