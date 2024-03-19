import { Injectable, inject, signal } from '@angular/core';
import { environment } from '../../environments/environment';
import { HttpClient } from '@angular/common/http';
import { ResponseProducts } from '../interfaces/product-response';
import { Product } from '../interfaces/product';

@Injectable({
  providedIn: 'root',
})
export class ProductsService {
  private http = inject(HttpClient);

  private urlBackend = `${environment.urlBackend}/products`;

  private _mainProducts = signal<ResponseProducts | undefined>(undefined);
  private _selectedProduct = signal<Product | undefined>(undefined);

  private _searchedProducts = signal<ResponseProducts | undefined>(undefined);

  constructor() {}

  get mainProducts() {
    console.log(this._mainProducts);
    console.log(process.env['URL_BACKEND']);

    return this._mainProducts;
  }

  get selectedProduct() {
    return this._selectedProduct;
  }

  get searchedProducts() {
    return this._searchedProducts;
  }

  async getProducts() {
    this.http.get<ResponseProducts>(this.urlBackend).subscribe((products) => {
      this._mainProducts.set(products);
      console.log(this._mainProducts);
    });
  }

  async loadMoreMainProducts(urlNext: string) {
    this.http.get<ResponseProducts>(urlNext).subscribe((products) => {
      if (this._mainProducts) {
        const mainProducts = this._mainProducts()?.products || [];

        products.products.forEach((product) => {
          if (mainProducts?.find((p) => p._id === product._id)) {
            return;
          }
          mainProducts?.push(product);
        });
        this._mainProducts.set({
          ...this._mainProducts,
          previous: products.previous,
          products: mainProducts,
          next: products.next,
        });
      }
    });
  }

  async getSearchProducts(url: string) {
    this.http.get<ResponseProducts>(url).subscribe((products) => {
      console.log(products);

      if (products) this._searchedProducts.set(products);
      if (!products) this._searchedProducts.set({ products: [] });
    });
  }

  deleteProduct(id: string) {
    return this.http.delete(this.urlBackend + `/${id}`).subscribe((res) => {
      console.log(res);
    });
  }

  async loadMoreSearchProducts(urlNext: string) {
    this.http.get<ResponseProducts>(urlNext).subscribe((products) => {
      if (this._searchedProducts) {
        const searchedProducts = this._searchedProducts()?.products || [];

        products.products.forEach((product) => {
          if (searchedProducts?.find((p) => p._id === product._id)) {
            return;
          }
          searchedProducts?.push(product);
        });
        this._searchedProducts.set({
          ...this._searchedProducts,
          previous: products.previous,
          products: searchedProducts,
          next: products.next,
        });
      }
    });
  }

  async addProduct(product: Product) {
    //hago el post en los headers le paso el producto
    return this.http.post(this.urlBackend, { ...product }).subscribe((res) => {
      this.selectedProduct.set(res as Product);
    });
  }

  getProductByID(id: string) {
    return this.http
      .get<Product>(this.urlBackend + `/${id}`)
      .subscribe((product) => {
        console.log(product);

        this._selectedProduct.update(() => product);
      });
  }

  getProductByIDUser(uid: string) {
    console.log(this.urlBackend + `/user/${uid}`);

    return this.http.get<Product[]>(this.urlBackend + `/user/${uid}`);
  }

  updateProduct(id: string, product: Product) {
    console.log(product);

    return this.http
      .patch(this.urlBackend + `/${id}`, { ...product })
      .subscribe((res) => {
        console.log(res);
      });
  }
}
