import { Body, Controller, Delete, Get, Param, Post, Put, Req, UseGuards } from '@nestjs/common';
import { Request } from 'express';
import { CustomerService } from './customer.service';
import { JwtAuthGuard } from 'src/auth/jwt-auth.guard';
import { Customer } from '../lib/entities/customer.entity';
import { ApiBearerAuth, ApiOkResponse, ApiTags } from '@nestjs/swagger';
import { signUpDto } from 'src/auth/dto/signup.dto';
import { uid } from 'uid';
import { Roles } from 'src/role/roles.decorator';
import { Role } from '../role/role.enum';
import { RolesGuard } from 'src/role/role.guard';


interface CreateTodoDto {
  name: string,
  complete: boolean
}
@Controller('customer')
export class CustomerController {
constructor(private customerService: CustomerService) {}

@Post('signUp')
@ApiTags('auth')
signUp(@Body() {id, email, password, role}: signUpDto) {
    return this.customerService.signUp(uid(36), email, password, role);
}

@Get(':id')
@UseGuards(JwtAuthGuard)
@ApiBearerAuth()
//@ApiOkResponse({ type: Customer })
  async findById(@Req() request: Request, @Param('id') id: string) {
    return this.customerService.findAll({  skip:0, take:10, where:  {
      id: id
    }
    });
  }

  @Get()
  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth()
  @ApiOkResponse({ type: Customer, isArray: true })
  async findAll(@Req() request: Request, @Param('id') id: string) {
    return this.customerService.findAll({  skip:0, take:10, where:  {
      id: id
    }
    });
  }

  @Put(':id')
  @Roles(Role.Admin)
  @UseGuards(JwtAuthGuard, RolesGuard)
  @ApiBearerAuth()
  @ApiOkResponse({ type: Customer })
  update(@Param('id') id: string, @Body() body: any) {
    return this.customerService.update(id, body);
  }

  @Delete(':id')
  @Roles(Role.Admin)
  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth()
  @ApiOkResponse({ type: Customer })
  async remove(@Param('id') id: string) {
    await this.customerService.delete(id);
    return "Customer profile has been deleted";
  }


}