import qs from 'qs'
import request from './../utils/request'
import type { BookType, CategoryType } from '../types'

export function getCategoryList(params?: {level?: number, all?: boolean}) {
  return request.get(`/api/categories?${qs.stringify(params)}`)
}

export function categoryAdd(params: BookType) {
  return request.post("/api/categories", params)
}

export const categoryUpdate = (id: string, params: CategoryType) => {
  return request.put(`/api/categories/${id}`, params);
};

export const categoryDelete = (id: string) => {
  return request.delete(`/api/categories/${id}`);
};
