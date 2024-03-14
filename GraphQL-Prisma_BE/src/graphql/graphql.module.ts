import { join } from 'path';
import { Module } from '@nestjs/common';
import { GraphQLModule } from '@nestjs/graphql';
import { ApolloDriver, ApolloDriverConfig } from '@nestjs/apollo';
// import { environment } from 'src/environments/environment.prod';
@Module({
  imports: [
    GraphQLModule.forRoot<ApolloDriverConfig>({
      autoSchemaFile: join(process.cwd(), 'src/graphql.gql'),
      driver: ApolloDriver,
    }),
  ],
  exports: [GraphQLModule],
})
export class GraphQlModule {}
