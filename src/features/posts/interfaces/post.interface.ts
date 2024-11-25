export interface Post {
  id: number;
  title: string;
  body: string;
  userId: number;
  user?: {
    name: string;
    email: string;
  };
}

export interface PostsResponse {
  items: Post[];
  total: number;
  page: number;
  totalPages: number;
  limit: number;
}
