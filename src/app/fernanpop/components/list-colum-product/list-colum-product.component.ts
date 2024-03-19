import { Component, OnDestroy, signal } from '@angular/core';
import { ItemSearchProductComponent } from '../item-search-product/item-search-product.component';
import { ItemSearchSkeletonComponent } from '../item-search-skeleton/item-search-skeleton.component';
import { ResponseProducts } from '../../../interfaces/product-response';
import { ProductsService } from '../../../services/products.service';
import { environment } from '../../../../environments/environment';
import { ActivatedRoute,  Router, RouterModule } from '@angular/router';

@Component({
  selector: 'app-list-colum-product',
  standalone: true,
  imports: [
    ItemSearchProductComponent,
    ItemSearchSkeletonComponent,
    RouterModule,
  ],
  templateUrl: './list-colum-product.component.html',
  styleUrl: './list-colum-product.component.css',
})
export class ListColumProductComponent implements OnDestroy {
  url: string = environment.urlBackend + '/products?';

  productResponse = signal<ResponseProducts | undefined>(undefined);

  constructor(
    private ps: ProductsService,
    private router: Router,
    private activatedRoute: ActivatedRoute
  ) {
    this.prepareUrl();

    this.ps.getSearchProducts(this.url);
    this.productResponse = this.ps.searchedProducts;
  }

  goToProduct(idProduct: string) {
    console.log(idProduct);
    
    this.router.navigate([`/product/${idProduct}`]);
  }

  loadMore() {
    if (this.productResponse()?.next) {
      this.ps.loadMoreSearchProducts(
        this.productResponse()?.next?.toString() ?? ''
      );
    }
  }
  prepareUrl() {
    const queryParams = this.activatedRoute.snapshot.queryParams;
    let firstParam: boolean = false;
    const name = queryParams['name'];
    const category = queryParams['category'];
    const minPrice = queryParams['minPrice'];
    const maxPrice = queryParams['maxPrice'];
    const status = queryParams['status'];

    if (name) {
      this.url += `name=${name}`;
      firstParam = true;
    }
    if (category) {
      if (firstParam) {
        this.url += `&category=${category}`;
      } else {
        this.url += `category=${category}`;
        firstParam = true;
      }
    }
    if (minPrice) {
      if (firstParam) {
        this.url += `&minPrice=${minPrice}`;
      } else {
        this.url += `minPrice=${minPrice}`;
        firstParam = true;
      }
    }
    if (maxPrice) {
      if (firstParam) {
        this.url += `&maxPrice=${maxPrice}`;
      } else {
        this.url += `maxPrice=${maxPrice}`;
        firstParam = true;
      }
    }
    if (status) {
      if (firstParam) {
        this.url += `&status=${status}`;
      } else {
        this.url += `status=${status}`;
        firstParam = true;
      }
    }
  }
  ngOnDestroy(): void {
    this.url = environment.urlBackend + '/products?';
  }
}
