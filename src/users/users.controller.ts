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
import { UpdateUserDto } from './dtos/update-user.dto'
import { User } from './user.entity'

@Controller('auth')
export class UsersController {
  constructor(private usersService: UsersService) {}

  @Post('/signup')
  async createUser(@Body() user: CreateUserDto) {
    const createdUser = await this.usersService.create(user)
    return createdUser
  }

  @Get(':id')
  async getUser(@Param('id') userId: User['id']) {
    // TODO: Remove password from response
    return this.usersService.findOne(userId)
  }

  @Get()
  async getUserByEmail(@Query('email') email: string) {
    // TODO: Remove password from response
    return this.usersService.findByEmail(email)
  }

  @Put(':id')
  async updateUser(
    @Param('id') userId: User['id'],
    @Body() newUserData: UpdateUserDto,
  ) {
    console.log({ userId })
    const updatedUser = await this.usersService.update(userId, newUserData)
    return updatedUser
  }

  @Delete(':id')
  async deleteUser(@Param('id') userId: number) {
    const deletedUser = await this.usersService.remove(userId)
    return deletedUser
  }
}
