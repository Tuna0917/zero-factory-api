import { NestFactory } from '@nestjs/core';
import { AppModule } from './app/app.module';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  const config = new DocumentBuilder()
    .setTitle('ZeroWaste API')
    .setDescription('제로웨이스트 앱용 백엔드 API 문서')
    .setVersion('1.0')
    .addTag('members')
    .addTag('places')
    .build();

  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api-docs', app, document);

  await app.listen(3000).then(() => console.log('http://localhost:3000/api-docs'));
}
bootstrap();
