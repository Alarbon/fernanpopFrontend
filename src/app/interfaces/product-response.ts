import { Product } from "./product";

export interface ResponseProducts {
  next?: string;
  previous?: string;
  products: Product[];
}

