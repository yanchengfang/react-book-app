import qs from 'qs'
import request from './../utils/request'
import type { BookQueryType, BookType } from '../types'

export function getBookList(params?: BookQueryType) {
  return request.get(`/api/books?${qs.stringify(params)}`)
}

// 
export function bookAdd(params: BookType) {
  return request.post("/api/books", params)
}