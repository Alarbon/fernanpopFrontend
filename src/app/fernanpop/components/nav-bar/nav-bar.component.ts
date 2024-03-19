import { CommonModule } from '@angular/common';
import { Component, ElementRef, ViewChild } from '@angular/core';
import { User } from '@angular/fire/auth';
import { Router, RouterModule } from '@angular/router';
import { AuthService } from '../../../services/auth.service';
import { ProductsService } from '../../../services/products.service';
import { environment } from '../../../../environments/environment';

@Component({
  selector: 'app-nav-bar',
  standalone: true,
  imports: [RouterModule, CommonModule],
  templateUrl: './nav-bar.component.html',
  styleUrl: './nav-bar.component.css',
})
export class NavBarComponent {
  user?: User;

  //un viewchild searchInput

  @ViewChild('searchInput') searchInputRef?: ElementRef;

  constructor(
    private authService: AuthService,
    private ps: ProductsService,
    private router: Router
  ) {
    this.authService.getUser().then((userCurrent) => {
      if (userCurrent) {
        this.user = userCurrent;
      }
    });
  }

  search() {
    const value = this.searchInputRef?.nativeElement.value;
    if (value) {
      const url= environment.urlBackend+'/products?name='+value;
      this.ps.getSearchProducts(url);
      this.router.navigate(['/search'], {
        queryParams: { name: value },
      });
    }
  }
}
