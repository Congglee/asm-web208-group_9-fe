import { IProductClient, IProduct } from './product';
export interface ICategoryClient {
  _id?: string;
  name: string;
  slug: string;
  image: string;
  products: Array<IProductClient[]>;
}
export interface ICategoryResponseClient {
  success: boolean;
  categories: ICategoryClient[];
}

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
