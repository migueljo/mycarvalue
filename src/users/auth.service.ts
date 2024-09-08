import { Injectable } from '@nestjs/common'
import { randomBytes, scrypt as _script } from 'crypto'
import { promisify } from 'util'

import { UsersService } from './users.service'

const scrypt = promisify(_script)

@Injectable()
export class AuthService {
  constructor(private userService: UsersService) {}

  async signup(email: string, password: string) {
    // Hash the user's password
    // Generate a salt
    // each byte generates 2 characters for a total of 16 characters in the salt
    const salt = randomBytes(8).toString('hex')
    // hash the salt and the password together
    const hash = (await scrypt(password, salt, 32)) as Buffer
    // Join the hashed and the salt together
    const result = `${salt}.${hash.toString('hex')}`
    // create and save a new user
    const user = await this.userService.create({ email, password: result })
    return user
  }
  async signin(email: string, password: string) {
    /**
     * 1. Check if a user with the provided email exists, if it doesn't, throw a NotFoundException
     * 2. Decrypt the password
     * 3. Compare the provided password with the decrypted password
     *  - If they don't match, throw a BadRequestException
     *  - If they do match, send back a cookie that contains the user's id
     */
  }
}
