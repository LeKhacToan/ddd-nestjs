import { Test, TestingModule } from '@nestjs/testing'
import { UserController } from './user.controller'
import { UserService } from './user.service'

describe('UserController', () => {
  let controller: UserController
  const mockUserService = {
    create: jest.fn((dto) => {
      return { ...dto, id: 1, createdAt: new Date(), updatedAt: new Date() }
    }),
    update: jest.fn((id, dto) => {
      return {
        id,
        ...dto,
        createdAt: new Date(),
        updatedAt: new Date(),
      }
    }),
  }

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [UserController],
      providers: [UserService],
    })
      .overrideProvider(UserService)
      .useValue(mockUserService)
      .compile()

    controller = module.get<UserController>(UserController)
  })

  it('should be defined', () => {
    expect(controller).toBeDefined()
  })

  it('should create user', () => {
    const input = { name: 'user name' }
    expect(controller.create(input)).toEqual({
      id: expect.any(Number),
      name: 'user name',
      createdAt: expect.any(Date),
      updatedAt: expect.any(Date),
    })

    expect(mockUserService.create).toHaveBeenCalledWith(input)
  })

  it('should update user', () => {
    const dto = { name: 'user name update' }
    expect(controller.update('1', dto)).toEqual({
      id: 1,
      ...dto,
      createdAt: expect.any(Date),
      updatedAt: expect.any(Date),
    })

    expect(mockUserService.update).toHaveBeenCalled()
  })
})
