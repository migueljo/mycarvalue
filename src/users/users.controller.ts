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
  UseGuards,
} from '@nestjs/common'

import { UsersService } from './users.service'
import { CreateUserDto } from './dtos/create-user.dto'
import { UpdateUserDto } from './dtos/update-user.dto'
import { Serialize } from '../interceptors/serialize.interceptor'
import { UserDto } from './dtos/user.dto'
import { AuthService } from './auth.service'
import { SigninUserDto } from './dtos/signin-user.dto'
import { CurrentUser } from './decorators/current-user.decorator'
import { User } from './user.entity'
import { AuthGuard } from 'src/guards/auth.guard'

@Serialize(UserDto)
@Controller('auth')
export class UsersController {
  constructor(
    private usersService: UsersService,
    private authService: AuthService,
  ) {}

  @UseGuards(AuthGuard)
  @Get('/whoami')
  whoAmI(@CurrentUser() user: User) {
    console.log(user)
    return user
  }

  @Post('/signup')
  async signup(@Body() body: CreateUserDto, @Session() session: any) {
    const user = await this.authService.signup(body.email, body.password)
    session.userId = user.id
    return user
  }

  @Post('/signin')
  async signin(@Body() body: SigninUserDto, @Session() session: any) {
    const user = await this.authService.signin(body.email, body.password)
    session.userId = user.id
    return user
  }

  @Post('/signout')
  async signout(@Session() session: any) {
    session.userId = null
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
