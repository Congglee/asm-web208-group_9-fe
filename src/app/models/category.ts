import { IProductClient } from './product';
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
