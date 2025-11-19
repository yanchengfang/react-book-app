import qs from 'qs'
import request from './../utils/request'
import type { BookType } from '../types'

// 使用工具类型Pick取BookType里面"name" | "category" | "author"三个属性，并使用工具类型Partial将其属性变为非必传
type GetBLQueryType = Partial<Pick<BookType, "name" | "category" | "author">> & {
  current?: number;
  pageSize?: number;
  all?: boolean;
}

export function getBookList(params?: GetBLQueryType) {
  return request.get(`/api/books?${qs.stringify(params)}`)
}

export function bookAdd(params: BookType) {
  return request.post("/api/books", params)
}

export const getBookDetail = (id: string | undefined) => {
  return request.get(`/api/books/${id}`);
};

export const bookDelete = (id: string) => {
  return request.delete(`/api/books/${id}`);
};