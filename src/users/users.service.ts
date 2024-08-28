import { Injectable } from '@nestjs/common'
import { CreateUserDto } from './dtos/create-user.dto'
import { User } from './user.entity'

@Injectable()
export class UsersService {
  constructor() {}

  async create(user: CreateUserDto) {
    return 'create user'
  }
  async findOne(id: string) {
    return 'get user'
  }
  async findByEmail(email: string) {
    return 'get user by email'
  }
  async update(id: string, user) {
    return 'update user'
  }
  async remove(id: string) {
    return 'delete user'
  }
}
