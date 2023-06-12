export interface IProductClient {
  _id?: string | number;
  name: string;
  price: number;
  thumb: string;
  images?: Array<string | object>;
  description?: string;
  slug?: string;
  categoryId?: {
    _id?: string;
    name: string;
    slug: string;
  };
}

export interface IProductsResponseClient {
  totalProduct: number;
  totalPages: number;
  products: IProductClient[];
  success: boolean;
}
export interface ProductFilterOptions {
  page?: number;
  name?: string;
  sort?: string;
  price?: number; // Thêm thuộc tính "price" kiểu number
}
