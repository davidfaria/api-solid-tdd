import { CreateDateColumn, PrimaryColumn, UpdateDateColumn } from 'typeorm'

import { v4 as uuid } from 'uuid'
export abstract class BaseEntity {
  constructor() {
    if (!this.id) {
      this.id = uuid()
    }
  }

  @PrimaryColumn()
  id: string

  @CreateDateColumn({ type: 'timestamp' })
  created_at: Date

  @UpdateDateColumn({ type: 'timestamp' })
  updated_at: Date
}
