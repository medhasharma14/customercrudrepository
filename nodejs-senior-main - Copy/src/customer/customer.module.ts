import { Module } from '@nestjs/common';
import { CustomerService } from './customer.service';
import { PrismaService } from 'src/prisma.service';
import { CustomerResolver } from './customer.resolver';
import { CustomerController } from './customer.controller';
import { RolesGuard } from 'src/role/role.guard';


@Module({
  imports: [],
  controllers: [CustomerController],
  providers: [CustomerService, PrismaService, CustomerResolver,RolesGuard],
  exports: [CustomerService],
})
export class CustomerModule {}
