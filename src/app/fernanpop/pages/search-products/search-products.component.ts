import { Component } from '@angular/core';
import { NavBarComponent } from '../../components/nav-bar/nav-bar.component';
import { ListColumProductComponent } from '../../components/list-colum-product/list-colum-product.component';

@Component({
  selector: 'app-search-products',
  standalone: true,
  imports: [NavBarComponent, ListColumProductComponent],
  templateUrl: './search-products.component.html',
  styleUrl: './search-products.component.css',
})
export class SearchProductsComponent {}
