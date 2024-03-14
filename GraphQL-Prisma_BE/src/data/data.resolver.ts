import { Resolver, Query, Mutation, Args } from '@nestjs/graphql';
import { DataService } from './data.service';
import { Data } from './data.model';
import { DataInput } from './data.input';

@Resolver(() => Data)
export class DataResolver {
  constructor(private readonly dataService: DataService) {}

  @Query(() => [Data])
  async getData(): Promise<Data[]> {
    return this.dataService.getData();
  }

  @Mutation(() => Data)
  async createData(@Args('data') dataInput: DataInput): Promise<Data> {
    return this.dataService.createData(dataInput);
  }

  @Mutation(() => Data)
  async updateData(
    @Args('id') id: string,
    @Args('data') dataInput: DataInput,
  ): Promise<Data> {
    return this.dataService.updateData(id, dataInput);
  }

  @Mutation(() => Data)
  async deleteData(@Args('id') id: string): Promise<Data> {
    return this.dataService.deleteData(id);
  }
}
