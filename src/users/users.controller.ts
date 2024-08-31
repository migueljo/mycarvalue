import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
  Query,
  NotFoundException,
} from '@nestjs/common'

import { UsersService } from './users.service'
import { CreateUserDto } from './dtos/create-user.dto'

@Controller('auth')
export class UsersController {
  constructor(private usersService: UsersService) {}

  @Post('/signup')
  async createUser(@Body() user: CreateUserDto) {
    const createdUser = await this.usersService.create(user)
    return createdUser
  }

  @Get(':id')
  async getUser(@Param('id') userId: string) {
    return this.usersService.findOne(userId)
  }

  @Get()
  async getUserByEmail(@Query('email') email: string) {
    console.log({ email })
    return this.usersService.findByEmail(email)
  }

  @Put(':id')
  async updateUser(@Param('id') userId: string, @Body() body) {
    // Validate the request body
    const updatedUser = await this.usersService.update(userId, body)
    console.log({ userId })
    return updatedUser
  }

  @Delete(':id')
  async deleteUser(@Param('id') userId: number) {
    const deletedUser = await this.usersService.remove(userId)
    return deletedUser
  }
}
