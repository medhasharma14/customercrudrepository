import { Injectable, InternalServerErrorException } from '@nestjs/common';
import { PrismaService } from 'src/prisma.service';
import { GetCustomerInput } from './dto/customer.input';

@Injectable()
export class CustomerService {
  constructor(private prisma: PrismaService) {}


  async signUp(id: any, email: any, password: any, role: any) {
    const user = await this.prisma.customer.create({

      data: {
        id: id,    
        email: email,
        password: password,
        role: role,
      },
    });

    if (!user) {
        throw new InternalServerErrorException();
    }
    delete user.password;
    return user;
}


  async findAll(params: GetCustomerInput) {
    const { skip, take, cursor, where } = params;

    return this.prisma.customer.findMany({
      skip,
      take,
      cursor,
      where,
    });
  }

  async findOne(data: any) {
  if(!JSON.parse(JSON.stringify(data)))
  {
    return this.prisma.customer.findUnique({
      where: {
        email: data,
        },
    })
  }else{
    return this.prisma.customer.findUnique({
      where: {
        id: data.id,
        },
    })
  }
  }

  update(id: string, data: any): Promise<any> {
    return this.prisma.customer.update({
      where: {
        id: id,
      },
      data: {
        email: data.email
      },
    })
  }

  delete(id: string){
    return this.prisma.customer.delete({
      where: {
        id: id,
      }
    })
  }

}
