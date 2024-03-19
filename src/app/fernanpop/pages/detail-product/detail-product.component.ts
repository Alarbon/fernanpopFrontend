import { Component, signal } from '@angular/core';
import { NavBarComponent } from '../../components/nav-bar/nav-bar.component';
import { Product } from '../../../interfaces/product';
import { ProductsService } from '../../../services/products.service';
import { ActivatedRoute, Router } from '@angular/router';
import { AuthService } from '../../../services/auth.service';

@Component({
  selector: 'app-detail-product',
  standalone: true,
  imports: [NavBarComponent],
  templateUrl: './detail-product.component.html',
  styleUrl: './detail-product.component.css',
})
export class DetailProductComponent {
  isFavorite: boolean = false;

  product = signal<Product | undefined>(undefined);

  constructor(
    public ps: ProductsService,
    public auth: AuthService,
    private activatedRoute: ActivatedRoute,
    private router: Router
  ) {
    this.activatedRoute.params.subscribe(({ id }) => {
      console.log(id);

      this.ps.getProductByID(id);
      this.product = this.ps.selectedProduct;
    });
  }

  toggleFavorite() {
    this.isFavorite = !this.isFavorite;
  }

  containsProduct(): boolean {
    console.log(this.auth.user?.uid, this.product()?.idUser);
    
    return this.auth.user?.uid === this.product()?.idUser;
  }
}
