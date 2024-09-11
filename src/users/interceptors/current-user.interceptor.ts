import {
  NestInterceptor,
  ExecutionContext,
  CallHandler,
  Injectable,
} from '@nestjs/common'

import { UsersService } from '../users.service'
import { Observable } from 'rxjs'

// @Intectable allows us to use dependency injection in this class
@Injectable()
export class CurrentUserInterceptor implements NestInterceptor {
  constructor(private usersService: UsersService) {}

  async intercept(context: ExecutionContext, next: CallHandler<any>) {
    const request = context.switchToHttp().getRequest()
    const userId = request.session.userId

    if (userId) {
      const user = await this.usersService.findOne(userId)
      console.log('Current User Interceptor', user)
      request.currentUser = user
    }

    return next.handle()
  }
}
