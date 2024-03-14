import { Module } from '@nestjs/common';
import { DataResolver } from './data.resolver';
import { DataService } from './data.service';
import { PrismaAppModule } from 'prisma/prisma.module';

@Module({
  imports: [PrismaAppModule],
  providers: [DataResolver, DataService],
})
export class DataModule {}
