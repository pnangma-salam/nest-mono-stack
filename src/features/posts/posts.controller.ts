import {
  Controller,
  Get,
  Query,
  Render,
  UseInterceptors,
  UseFilters,
} from '@nestjs/common';
import { PostsService } from './posts.service';
import { PostFiltersDto } from './dto/post-filters.dto';
import { HtmxInterceptor } from 'src/infrastructure/interceptors/htmx.interceptor';
import { UrlStateFilter } from 'src/infrastructure/filters/url-state.filter';

@Controller('posts')
@UseInterceptors(HtmxInterceptor)
@UseFilters(UrlStateFilter)
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
    const data = await this.postsService.getPosts(filters);
    return {
      ...data,
      filters,
    };
  }
}
