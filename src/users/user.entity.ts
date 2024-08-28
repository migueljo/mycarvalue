import { Entity, Column, PrimaryGeneratedColumn, Unique } from 'typeorm'

@Entity()
// TODO: Enable unique
// @Unique(['email'])
export class User {
  @PrimaryGeneratedColumn()
  id: number

  @Column()
  email: string

  @Column()
  password: string
}
