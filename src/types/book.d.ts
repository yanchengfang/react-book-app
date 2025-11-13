export interface BookQueryType {
  name?: string;
  author?: string;
  category?: number;
  current?: number;
  pageSize?: number;
}

export interface BookType {
  name: string;
  author: string;
  category: string;
  cover?: string;
  stock?: number;
  publishAt?: number;
  description?: string;
}