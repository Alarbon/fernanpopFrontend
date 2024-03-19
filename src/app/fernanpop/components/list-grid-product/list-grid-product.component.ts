import { CommonModule } from '@angular/common';
import { Component, signal } from '@angular/core';
import { Router, RouterModule } from '@angular/router';
import { CardProductItemComponent } from '../card-product-item/card-product-item.component';
import { SkeletonsCardProductComponent } from '../skeletons-card-product/skeletons-card-product.component';
import { ResponseProducts } from '../../../interfaces/product-response';
import { ProductsService } from '../../../services/products.service';

@Component({
  selector: 'app-list-grid-product',
  standalone: true,
  imports: [
    CommonModule,
    RouterModule,
    CardProductItemComponent,
    SkeletonsCardProductComponent,
  ],
  templateUrl: './list-grid-product.component.html',
  styleUrl: './list-grid-product.component.css',
})
export class ListGridProductComponent {
  
  productResponse = signal<ResponseProducts | undefined>(undefined);
  constructor(private ps: ProductsService, private router: Router) {
      this.ps.getProducts();
      this.productResponse = this.ps.mainProducts;
  }

  goToProduct(idProduct: string) {
    console.log(idProduct);
    
    this.router.navigate([`/product/${idProduct}`]);
  }
  loadMore() {
    if (this.productResponse()?.next) {
      this.ps.loadMoreMainProducts(this.productResponse()?.next?.toString() ?? '');
    }
  }
}
