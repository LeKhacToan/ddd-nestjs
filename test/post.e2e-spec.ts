import { Test, TestingModule } from '@nestjs/testing'
import { INestApplication } from '@nestjs/common'
import * as request from 'supertest'
import { PostModule } from './../src/post/post.module'
import { getRepositoryToken } from '@nestjs/typeorm'
import { Post } from './../src/post/entities/post.entity'

describe('PostController (e2e)', () => {
  let app: INestApplication
  const mockPosts = [
    {
      id: 1,
      title: 'toanlk 1',
      content: 'aaaaaaaaaa',
      createdAt: '2024-08-17T09:00:27.619Z',
      updatedAt: '2024-08-17T09:00:27.619Z',
      userId: 2,
      user: {
        id: 2,
        name: 'toanlk 1',
        createdAt: '2024-08-16T22:14:52.574Z',
        updatedAt: '2024-08-17T05:14:52.440Z',
      },
    },
  ]
  const mockPostRepository = {
    find: jest.fn().mockResolvedValue(mockPosts),
    create: jest.fn().mockImplementation((dto) => ({
      ...dto,
      createdAt: new Date(),
      updatedAt: new Date(),
    })),
    save: jest.fn().mockImplementation((dto) =>
      Promise.resolve({
        id: 1,
        ...dto,
      }),
    ),
  }

  beforeEach(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [PostModule],
    })
      .overrideProvider(getRepositoryToken(Post))
      .useValue(mockPostRepository)
      .compile()

    app = moduleFixture.createNestApplication()
    await app.init()
  })

  it('/posts (GET)', () => {
    return request(app.getHttpServer())
      .get('/posts')
      .expect(200)
      .expect(mockPosts)
  })

  it('/posts (POST)', () => {
    return request(app.getHttpServer())
      .post('/posts')
      .send({ title: 'title', content: 'content', userId: 1 })
      .expect(201)
  })
})
