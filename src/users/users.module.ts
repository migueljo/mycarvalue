import { Module } from '@nestjs/common'
import { TypeOrmModule } from '@nestjs/typeorm'

import { UsersService } from './users.service'
import { UsersController } from './users.controller'
import { User } from './user.entity'
import { AuthService } from './auth.service'
import { CurrentUserInterceptor } from './interceptors/current-user.interceptor'
import { APP_INTERCEPTOR } from '@nestjs/core'

@Module({
  providers: [
    UsersService,
    AuthService,
    CurrentUserInterceptor,
    { useClass: CurrentUserInterceptor, provide: APP_INTERCEPTOR },
  ],
  controllers: [UsersController],
  // Create repository for User entity
  imports: [TypeOrmModule.forFeature([User])],
})
export class UsersModule {}
