import { Component } from '@angular/core';
import { Router, RouterModule } from '@angular/router';
import { NavBarComponent } from '../../components/nav-bar/nav-bar.component';
import { ListGridProductComponent } from '../../components/list-grid-product/list-grid-product.component';
import { DropDownMenuComponent } from '../../components/drop-down-menu/drop-down-menu.component';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [NavBarComponent, RouterModule,ListGridProductComponent,DropDownMenuComponent],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css',
})
export class HomeComponent {

}
