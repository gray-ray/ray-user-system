import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';

import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger'
// import { ValidationPipe } from '../core/validate.pipe';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  // NOTE: app.module.tsz全局注入
  // app.useGlobalPipes(new ValidationPipe())

  const options = new DocumentBuilder()
    .setTitle('用户管理系统')
    .setDescription('用户、应用、角色、权限统一管理')
    .setVersion('1.0')
    // .addTag('cats')
    .build();
  const document = SwaggerModule.createDocument(app, options);
  SwaggerModule.setup('docs', app, document);

  await app.listen(3000);
}
bootstrap();
