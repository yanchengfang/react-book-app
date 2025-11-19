import qs from 'qs'
import request from './../utils/request'
import type { BookType } from '../types'

export function getCategoryList(params?: {level?: number, all?: boolean}) {
  return request.get(`/api/categories?${qs.stringify(params)}`)
}

export function categoryAdd(params: BookType) {
  return request.post("/api/categories", params)
}