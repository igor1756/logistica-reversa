import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  app.enableCors({
    origin: ['http://localhost:3001', 'http://127.0.0.1:3001'],
    credentials: true,
  });

  await app.listen(3000);
}
bootstrap()
  .then(() => console.log('Backend rodando em http://localhost:3000'))
  .catch((err) => console.error('Erro ao iniciar o backend:', err));
