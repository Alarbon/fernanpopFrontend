import { Component } from '@angular/core';
import { environment } from '../../../../environments/environment';
import { ProductsService } from '../../../services/products.service';
import { CommonModule } from '@angular/common';
import { RouterModule, Router } from '@angular/router';

@Component({
  selector: 'app-drop-down-menu',
  standalone: true,
  imports: [CommonModule,RouterModule],
  templateUrl: './drop-down-menu.component.html',
  styleUrl: './drop-down-menu.component.css',
})
export class DropDownMenuComponent {
  constructor(private ps:ProductsService, private router:Router) {}

  searchCategory(category: string) {
    this.router.navigate(['/search'], {
      queryParams: { category: category },
    });
   
  }
}
