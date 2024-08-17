import { Injectable } from '@nestjs/common'
import { InjectRepository } from '@nestjs/typeorm'
import { Repository } from 'typeorm'
import { CreatePostDto } from './dto/create-post.dto'
import { UpdatePostDto } from './dto/update-post.dto'
import { Post } from './entities/post.entity'

@Injectable()
export class PostService {
  constructor(
    @InjectRepository(Post) private postRepository: Repository<Post>,
  ) {}

  create(createPostDto: CreatePostDto) {
    const post = this.postRepository.create({
      ...createPostDto,
      createdAt: new Date(),
      updatedAt: new Date(),
    })
    return this.postRepository.save(post)
  }

  findAll() {
    return this.postRepository.find({ relations: ['user'] })
  }

  findOne(id: number) {
    return this.postRepository.findOne({ where: { id }, relations: ['user'] })
  }

  update(id: number, updatePostDto: UpdatePostDto) {
    return this.postRepository.update(
      { id },
      { ...updatePostDto, updatedAt: new Date() },
    )
  }

  remove(id: number) {
    return this.postRepository.delete(id)
  }
}
