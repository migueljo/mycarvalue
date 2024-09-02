import {
  Injectable,
  NotFoundException,
  ConflictException,
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
    return this.repo.findOneBy({ id })
  }
  async findByEmail(email: string) {
    return this.repo.find({ where: { email } })
  }
  async update(id: User['id'], user) {
    return this.repo.update({ id }, user)
  }
  async remove(id: User['id']) {
    const user = await this.repo.findOne({ where: { id } })
    if (!user) {
      throw new NotFoundException("User doesn't exist")
    }
    return this.repo.remove(user)
  }
}
