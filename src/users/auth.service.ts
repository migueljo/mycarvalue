import { Injectable } from '@nestjs/common'
import { UsersService } from './users.service'

@Injectable()
export class AuthService {
  constructor(private userService: UsersService) {}

  async signup(email: string, password: string) {
    console.log('Signup', email, password)
    /**
     * 1. Check if a user with the email already exists, if it does, throw a ConflictException
     * 2. Encrypt the password
     * 3. Store the new user record in the database
     * 4. Send back a cookie that contains the user's id
     */
  }
}
