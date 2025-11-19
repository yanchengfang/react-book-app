export interface BookType {
  _id: string;
  name: string;
  author: string;
  category: string;
  cover?: string;
  stock?: number;
  tag?: number;
  createdAt?: number;
  publishAt?: number;
  description?: string;
}

export interface BookQueryType {
  name: string;
  author: string;
  category: string;
}