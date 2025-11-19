export interface CategoryType {
  _id?: string;
  name: string;
  level: number;
  cover: string;
  parentLevel: string;
  parent: CategoryType;
  children: CategoryType[];
}

export interface CategoryQueryType {
  name?: string;
  level?: number;
}