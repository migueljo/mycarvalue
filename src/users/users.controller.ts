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

  @Get('/:id')
  async getUser(@Param('id') userId: string) {
    // TODO: Remove password from response
    return this.usersService.findOne(parseInt(userId, 10))
  }

  @Get()
  async getUserByEmail(@Query('email') email: string) {
    // TODO: Remove password from response
    return this.usersService.findByEmail(email)
  }

  @Put('/:id')
  async updateUser(
    @Param('id') userId: string,
    @Body() newUserData: UpdateUserDto,
  ) {
    const updatedUser = await this.usersService.update(
      parseInt(userId, 10),
      newUserData,
    )
    return updatedUser
  }

  @Delete('/:id')
  async deleteUser(@Param('id') userId: string) {
    const deletedUser = await this.usersService.remove(parseInt(userId, 10))
    return deletedUser
  }
}
