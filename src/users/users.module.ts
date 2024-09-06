import { Module } from '@nestjs/common'
import { TypeOrmModule } from '@nestjs/typeorm'

import { UsersService } from './users.service'
import { UsersController } from './users.controller'
import { User } from './user.entity'
import { AuthService } from './auth.service'

@Module({
  providers: [UsersService, AuthService],
  controllers: [UsersController],
  // Create repository for User entity
  imports: [TypeOrmModule.forFeature([User])],
})
export class UsersModule {}
