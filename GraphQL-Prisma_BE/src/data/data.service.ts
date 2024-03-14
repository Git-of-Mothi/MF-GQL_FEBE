import { Injectable } from '@nestjs/common';
import { Data } from './data.model';
import { PrismaService } from 'prisma/prisma.service';

@Injectable()
export class DataService {
  constructor(private readonly prisma: PrismaService) {}

  async getData(): Promise<Data[]> {
    return this.prisma.data.findMany();
  }

  async createData(data: Data): Promise<Data> {
    return this.prisma.data.create({
      data,
    });
  }

  async updateData(id: string, data: Data): Promise<Data> {
    return this.prisma.data.update({
      where: { id },
      data,
    });
  }

  async deleteData(id: string): Promise<Data> {
    return this.prisma.data.delete({
      where: { id },
    });
  }
}
