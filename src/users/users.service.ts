import {
  Injectable,
  NotFoundException,
  BadRequestException,
} from '@nestjs/common'
import { Repository } from 'typeorm'
import { InjectRepository } from '@nestjs/typeorm'

import { CreateUserDto } from './dtos/create-user.dto'
import { User } from './user.entity'

@Injectable()
export class UsersService {
  constructor(@InjectRepository(User) private repo: Repository<User>) {}

  async create(user: CreateUserDto) {
    const userExists = await this.repo.findOneBy({ email: user.email })
    if (userExists) {
      throw new BadRequestException('Email already used')
    }
    const userEntity = this.repo.create(user)
    return this.repo.save(userEntity)
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
  async remove(id: number) {
    const user = await this.repo.findOne({ where: { id } })
    if (!user) {
      throw new NotFoundException("User doesn't exist")
    }
    return this.repo.remove(user)
  }
}
