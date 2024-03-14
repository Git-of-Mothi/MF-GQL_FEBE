import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { DataModule } from './data/data.module';
import { GraphQlModule } from './graphql/graphql.module';

@Module({
  imports: [DataModule, GraphQlModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
