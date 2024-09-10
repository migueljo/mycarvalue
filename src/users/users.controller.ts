import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
  Query,
  Session,
} from '@nestjs/common'

import { UsersService } from './users.service'
import { CreateUserDto } from './dtos/create-user.dto'
import { UpdateUserDto } from './dtos/update-user.dto'
import { Serialize } from '../interceptors/serialize.interceptor'
import { UserDto } from './dtos/user.dto'
import { AuthService } from './auth.service'
import { SigninUserDto } from './dtos/signin-user.dto'

@Serialize(UserDto)
@Controller('auth')
export class UsersController {
  constructor(
    private usersService: UsersService,
    private authService: AuthService,
  ) {}

  @Post('/colors/:color')
  setColor(@Param('color') color: string, @Session() session: any) {
    session.color = color
  }

  @Get('/colors')
  getColor(@Session() session: any) {
    return session.color
  }

  @Post('/signup')
  async signup(@Body() user: CreateUserDto) {
    return this.authService.signup(user.email, user.password)
  }
  @Post('/signin')
  async signin(@Body() user: SigninUserDto) {
    return this.authService.signin(user.email, user.password)
  }

  @Get('/:id')
  async getUser(@Param('id') userId: string) {
    return this.usersService.findOne(parseInt(userId, 10))
  }

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
