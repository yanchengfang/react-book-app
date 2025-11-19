export interface ResType<T> {
  data: T[];
  success: boolean;
  total: number;
}

export interface BookDetailResType {
  data: BookType;
  success: boolean;
}