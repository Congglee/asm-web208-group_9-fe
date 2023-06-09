export interface IProduct {
  _id?: string | number;
  name: string;
  price: number;
  thumb: string;
  images?: Array<string | object>;
  description?: string;
  categoryId?: {
    _id?: string;
    name: string;
    slug: string;
  };
}

export interface IProductsResponse {
  counts: number;
  products: IProduct[];
  success: boolean;
}
export interface IProductResponse {
  productData: IProduct;
  success: boolean;
}
