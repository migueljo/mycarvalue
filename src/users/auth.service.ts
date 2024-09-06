import { BadRequestException, Injectable } from '@nestjs/common'
import { UsersService } from './users.service'

@Injectable()
export class AuthService {
  constructor(private userService: UsersService) {}

  async signup(email: string, password: string) {
    console.log('Signup', email, password)
    // See if email is in use
    const users = await this.userService.findByEmail(email)
    if (users.length > 0) {
      throw new BadRequestException('Email already in use')
    }

    // Hash the user's password

    // Create a new user and save it

    // Respond with the user
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
