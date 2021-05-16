/* eslint-disable @typescript-eslint/no-explicit-any */
import { MigrationInterface, QueryRunner, Table } from 'typeorm'

export class createUsersTable1585051901792 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<any> {
    await queryRunner.createTable(
      new Table({
        name: 'users',
        columns: [
          {
            name: 'id',
            type: 'uuid',
            isPrimary: true,
            generationStrategy: 'uuid',
            default: 'uuid_generate_v4()'
          },
          {
            name: 'image',
            type: 'varchar',
            default: "'/uploads/avatar/default.jpeg'"
          },
          {
            name: 'name',
            type: 'varchar'
          },
          {
            name: 'email',
            type: 'varchar',
            length: '100',
            isUnique: true
          },
          {
            name: 'password',
            type: 'varchar'
          },
          {
            name: 'forgot',
            type: 'varchar',
            isNullable: true,
            default: null
          },
          {
            name: 'forgot_at',
            type: 'timestamp',
            default: null,
            isNullable: true
          },
          {
            name: 'status',
            type: 'enum',
            enum: ['registred', 'confirmed', 'canceled']
          },
          {
            name: 'confirmed_at',
            type: 'timestamp',
            default: null,
            isNullable: true
          },
          {
            name: 'deleted_at',
            type: 'timestamp',
            default: null,
            isNullable: true
          },
          {
            name: 'created_at',
            type: 'timestamp',
            default: 'CURRENT_TIMESTAMP'
          },
          {
            name: 'updated_at',
            type: 'timestamp',
            default: 'CURRENT_TIMESTAMP',
            onUpdate: 'CURRENT_TIMESTAMP'
          }
        ]
      }),
      true
    )
  }

  public async down(queryRunner: QueryRunner): Promise<any> {
    await queryRunner.dropTable('users')
  }
}
