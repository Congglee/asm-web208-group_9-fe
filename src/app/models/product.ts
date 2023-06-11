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
  slug?: string;
}

// Get all product data
export interface IProductsResponse {
  counts: number;
  products: IProduct[];
  success: boolean;
}

// Get one product data
export interface IProductResponse {
  productData: IProduct;
  success: boolean;
}
