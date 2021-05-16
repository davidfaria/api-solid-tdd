import { container } from 'tsyringe'
import { CreateUserUseCase } from '@apps/users/usecases/create-user/create-user-usecase'
import { ListUserUseCase } from '@apps/users/usecases/list-user/list-user-usecase'

let createUserUseCase: CreateUserUseCase
let listUserUseCase: ListUserUseCase
describe('ListUserUseCase', () => {
  beforeEach(() => {
    createUserUseCase = container.resolve(CreateUserUseCase)
    listUserUseCase = container.resolve(ListUserUseCase)
  })

  it('should able to authenticate a user ', async () => {
    Promise.all([
      [1, 2, 3, 4].forEach(async (el) => {
        await createUserUseCase.execute({
          name: `User${el}`,
          email: `${el}@mail.com`,
          password: '123456'
        })
      })
    ])

    const users = await listUserUseCase.execute()

    expect(users).toHaveLength(4)
  })
})
