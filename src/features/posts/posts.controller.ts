// src/features/posts/posts.controller.ts
import {
  Controller,
  Get,
  Query,
  Render,
  UseInterceptors,
} from '@nestjs/common';
import { PostsService } from './posts.service';
import { PostFiltersDto } from './dto/post-filters.dto';
import { HtmxInterceptor } from 'src/infrastructure/interceptors/htmx.interceptor';

@Controller('posts')
@UseInterceptors(HtmxInterceptor)
export class PostsController {
  constructor(private readonly postsService: PostsService) {}

  @Get()
  @Render('pages/posts/index')
  async getPostsPage(@Query() filters: PostFiltersDto) {
    const data = await this.postsService.getPosts(filters);

    return {
      ...data,
      filters,
      meta: {
        title: 'Posts',
        description: 'Explore our posts',
      },
    };
  }

  @Get('list')
  @Render('pages/posts/_list')
  async getPostsList(@Query() filters: PostFiltersDto) {
    return this.postsService.getPosts(filters);
  }
}
