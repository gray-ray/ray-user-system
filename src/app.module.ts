import { Module, ValidationPipe } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UserModule } from './user/user.module';
import { ApplicationsModule } from './applications/applications.module';
import { RolesModule } from './roles/roles.module';
import { PermissionsModule } from './permissions/permissions.module';

import { TypeOrmModule } from '@nestjs/typeorm';
// import { ConfigModule, ConfigService } from '@nestjs/config';

import { APP_PIPE } from '@nestjs/core';

@Module({
  imports: [
    // ConfigModule.forRoot({ isGlobal: true }),
    TypeOrmModule.forRootAsync({
      // 配置项暂时无用
      // imports: [ConfigModule],
      // inject: [ConfigService],
      useFactory: async () => {
        return {
          type: 'mysql',
          host: 'localhost',
          database: 'user_system',
          port: 3306,
          username: 'root',
          password: 'root123456',
          synchronize: true, // 生产环境关闭
          autoLoadEntities: true,
        };
      },
    }),
    UserModule,
    ApplicationsModule,
    RolesModule,
    PermissionsModule,
  ],
  controllers: [AppController],
  providers: [AppService,{
    provide: APP_PIPE,
    useClass: ValidationPipe
  }],
})
export class AppModule {}
