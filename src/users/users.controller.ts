import {
  Body,
  ClassSerializerInterceptor,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
  Query,
  UseInterceptors,
} from '@nestjs/common'

import { UsersService } from './users.service'
import { CreateUserDto } from './dtos/create-user.dto'
import { UpdateUserDto } from './dtos/update-user.dto'
import { SerializeInterceptor } from 'src/interceptors/serialize.interceptor'

@Controller('auth')
export class UsersController {
  constructor(private usersService: UsersService) {}

  @Post('/signup')
  async createUser(@Body() user: CreateUserDto) {
    const createdUser = await this.usersService.create(user)
    return createdUser
  }

  @UseInterceptors(SerializeInterceptor)
  @Get('/:id')
  async getUser(@Param('id') userId: string) {
    console.log('Handler is running')
    return this.usersService.findOne(parseInt(userId, 10))
  }

  @UseInterceptors(ClassSerializerInterceptor)
  @Get()
  async getUserByEmail(@Query('email') email: string) {
    return this.usersService.findByEmail(email)
  }

  @Put('/:id')
  async updateUser(@Param('id') userId: string, @Body() body: UpdateUserDto) {
    const updatedUser = await this.usersService.update(
      parseInt(userId, 10),
      body,
    )
    return updatedUser
  }

  @Delete('/:id')
  async deleteUser(@Param('id') userId: string) {
    const deletedUser = await this.usersService.remove(parseInt(userId, 10))
    return deletedUser
  }
}
