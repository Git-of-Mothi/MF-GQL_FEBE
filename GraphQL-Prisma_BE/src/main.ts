import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';

const PORT = 3100;

async function bootstrap() {
  const app = await NestFactory.create(AppModule, { cors: true });
  await app.listen(PORT);
  console.log(`Server is running on port ${PORT}`);
}
bootstrap();
