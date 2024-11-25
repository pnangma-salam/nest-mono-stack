// src/features/posts/posts.service.ts
import { Injectable } from '@nestjs/common';
import { HttpService } from '@nestjs/axios';
import { firstValueFrom } from 'rxjs';
import { Post, PostsResponse } from './interfaces/post.interface';
import { PostFiltersDto } from './dto/post-filters.dto';

@Injectable()
export class PostsService {
  private readonly API_URL = 'https://jsonplaceholder.typicode.com';

  constructor(private readonly httpService: HttpService) {}

  async getPosts(filters: PostFiltersDto): Promise<PostsResponse> {
    console.log(filters);
    const [posts, users] = await Promise.all([
      this.fetchPosts(),
      this.fetchUsers(),
    ]);

    // Enrichir les posts avec les informations utilisateur
    const enrichedPosts = posts.map((post) => ({
      ...post,
      user: users.find((user) => user.id === post.userId),
    }));

    // Appliquer les filtres
    let filteredPosts = this.applyFilters(enrichedPosts, filters);

    // Appliquer le tri
    filteredPosts = this.applySorting(filteredPosts, filters);
    // console.log(filteredPosts);
    // Calculer la pagination
    const total = filteredPosts.length;
    const totalPages = Math.ceil(total / filters.limit);
    const start = (filters.page - 1) * filters.limit;
    const end = start + filters.limit;
    console.log(start, end, filters);

    const result = {
      items: filteredPosts.slice(start, end),
      total,
      page: filters.page,
      totalPages,
      limit: filters.limit,
    };

    console.log(result);

    return { title: 'Post list', ...result } as any;
  }

  private async fetchPosts(): Promise<Post[]> {
    const { data } = (await firstValueFrom(
      this.httpService.get<Post[]>(`${this.API_URL}/posts`),
    )) as any;
    return data;
  }

  private async fetchUsers() {
    const { data } = (await firstValueFrom(
      this.httpService.get(`${this.API_URL}/users`),
    )) as any;
    return data;
  }

  private applyFilters(posts: Post[], filters: PostFiltersDto): Post[] {
    let result = [...posts];

    if (filters.search) {
      const searchLower = filters.search.toLowerCase();
      result = result.filter(
        (post) =>
          post.title.toLowerCase().includes(searchLower) ||
          post.body.toLowerCase().includes(searchLower) ||
          post.user?.name.toLowerCase().includes(searchLower),
      );
    }

    if (filters.userId) {
      result = result.filter((post) => post.userId === filters.userId);
    }

    return result;
  }

  private applySorting(posts: Post[], filters: PostFiltersDto): Post[] {
    return [...posts].sort((a, b) => {
      const aValue = this.getSortValue(a, filters.sortBy);
      const bValue = this.getSortValue(b, filters.sortBy);

      const compareResult = aValue > bValue ? 1 : -1;
      return filters.sortOrder === 'asc' ? compareResult : -compareResult;
    });
  }

  private getSortValue(post: Post, sortBy: string): any {
    switch (sortBy) {
      case 'title':
        return post.title.toLowerCase();
      case 'user':
        return post.user?.name.toLowerCase();
      default:
        return post[sortBy];
    }
  }
}
