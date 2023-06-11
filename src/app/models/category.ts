import { IProduct } from './product';

export interface ICategory {
  _id?: string | number;
  name: string;
  image?: string;
  products?: Array<IProduct[]>;
}

export interface ICategoriesResponse {
  success: boolean;
  categories: ICategory[];
}

export interface ICategoryResponse {
  success: boolean;
  productCategory: ICategory;
}
