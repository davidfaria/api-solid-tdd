import { Column, Entity } from 'typeorm'
import { BaseEntity } from './base'

export enum UserStatus {
  registred = 'registred',
  confirmed = 'confirmed',
  canceled = 'canceled'
}

@Entity('users')
export class User extends BaseEntity {
  @Column()
  image: string

  @Column()
  name: string

  @Column()
  email: string

  @Column()
  password: string

  @Column({ type: 'character varying', nullable: true })
  forgot: string | null

  @Column({ type: 'timestamp', nullable: true })
  forgot_at: Date | null

  @Column({
    type: 'character varying',
    default: UserStatus.registred
  })
  status: UserStatus

  @Column({ type: 'timestamp', nullable: true })
  confirmed_at: Date | null

  @Column({ type: 'timestamp', nullable: true })
  deleted_at: Date | null
}
