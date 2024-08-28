import { Injectable } from '@nestjs/common'
import { Repository } from 'typeorm'
import { InjectRepository } from '@nestjs/typeorm'

import { CreateUserDto } from './dtos/create-user.dto'
import { User } from './user.entity'

@Injectable()
export class UsersService {
  constructor(@InjectRepository(User) private repo: Repository<User>) {}

  async create(user: CreateUserDto) {
    return this.repo.save(user)
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
