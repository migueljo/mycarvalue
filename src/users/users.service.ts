import {
  Injectable,
  NotFoundException,
  ConflictException,
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
      throw new ConflictException('Email already used')
    }
    const userEntity = this.repo.create(user)
    return this.repo.save(userEntity)
  }
  async findOne(id: User['id']) {
    if (id === undefined || id === null) {
      throw new BadRequestException('userId cannot be empty')
    }

    const user = await this.repo.findOneBy({ id })
    if (!user) {
      throw new NotFoundException('User not found')
    }
    return user
  }
  async findByEmail(email: string) {
    return this.repo.findOneBy({ email })
  }
  async update(id: User['id'], attrs: Partial<User>) {
    const user = await this.findOne(id)
    const updatedUser = Object.assign({}, user, attrs)
    return this.repo.save(updatedUser)
  }
  async remove(id: User['id']) {
    const user = await this.findOne(id)
    return this.repo.remove(user)
  }

  async signup(email: string, password: string) {
    /**
     * 1. Check if a user with the email already exists, if it does, throw a ConflictException
     * 2. Encrypt the password
     * 3. Store the new user record in the database
     * 4. Send back a cookie that contains the user's id
     */
  }
}
