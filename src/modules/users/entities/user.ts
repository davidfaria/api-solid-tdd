import {
  Column,
  Entity,
  CreateDateColumn,
  PrimaryColumn,
  UpdateDateColumn
} from 'typeorm'

import { v4 as uuid } from 'uuid'
export enum UserStatus {
  registred = 'registred',
  confirmed = 'confirmed',
  canceled = 'canceled'
}

@Entity('users')
export class User {
  constructor() {
    if (!this.id) {
      this.id = uuid()
    }
  }

  @PrimaryColumn()
  id: string

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

  @CreateDateColumn({ type: 'timestamp' })
  created_at: Date

  @UpdateDateColumn({ type: 'timestamp' })
  updated_at: Date
}
