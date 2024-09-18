import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common'
import { randomBytes, scrypt as _script } from 'crypto'
import { promisify } from 'util'

import { UsersService } from './users.service'

const scrypt = promisify(_script)

export const generateHash = async (password: string, salt: string) => {
  return (await scrypt(password, salt, 32)) as Buffer
}

@Injectable()
export class AuthService {
  constructor(private userService: UsersService) {}

  async signup(email: string, password: string) {
    // Hash the user's password
    // Generate a salt
    // each byte generates 2 characters for a total of 16 characters in the salt
    const salt = randomBytes(8).toString('hex')
    // hash the salt and the password together
    const hash = await generateHash(password, salt)
    // Join the hashed and the salt together
    const result = `${salt}.${hash.toString('hex')}`
    // create and save a new user
    const user = await this.userService.create(email, result)
    return user
  }

  async signin(email: string, password: string) {
    // Find user by email
    const user = await this.userService.findByEmail(email)
    if (!user) {
      throw new NotFoundException('User not found')
    }
    // Get salt from user's password
    const [salt, storedHash] = user.password.split('.')
    // hash the provided password with the salt from the DB
    const hashToValidate = (await generateHash(password, salt)).toString('hex')

    if (storedHash !== hashToValidate) {
      throw new BadRequestException()
    }

    // Return cookie with user's id
    return user
  }
}
