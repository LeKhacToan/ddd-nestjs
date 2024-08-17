import { Test, TestingModule } from '@nestjs/testing'
import { getRepositoryToken } from '@nestjs/typeorm'
import { UserService } from './user.service'
import { User } from './entities/user.entity'

describe('UserService', () => {
  let service: UserService
  const mockUserRepository = {
    create: jest.fn().mockImplementation((dto) => ({
      ...dto,
      createdAt: new Date(),
      updatedAt: new Date(),
    })),
    save: jest.fn().mockImplementation((user) =>
      Promise.resolve({
        id: 1,
        ...user,
      }),
    ),
  }

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        UserService,
        {
          provide: getRepositoryToken(User),
          useValue: mockUserRepository,
        },
      ],
    }).compile()

    service = module.get<UserService>(UserService)
  })

  it('should be defined', () => {
    expect(service).toBeDefined()
  })

  it('should create a new user and return that', async () => {
    expect(await service.create({ name: 'username' })).toEqual({
      id: 1,
      name: 'username',
      createdAt: expect.any(Date),
      updatedAt: expect.any(Date),
    })
  })
})
