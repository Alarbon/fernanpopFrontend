import { Component } from '@angular/core';
import { NavBarComponent } from '../../components/nav-bar/nav-bar.component';
import { User } from '@angular/fire/auth';
import { AuthService } from '../../../services/auth.service';
import { Router, RouterModule } from '@angular/router';
import { ProductsService } from '../../../services/products.service';
import { Product } from '../../../interfaces/product';
import { SkeletonsCardProductComponent } from '../../components/skeletons-card-product/skeletons-card-product.component';
import { CardProductItemComponent } from '../../components/card-product-item/card-product-item.component';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-perfil',
  standalone: true,
  imports: [
    NavBarComponent,
    RouterModule,
    SkeletonsCardProductComponent,
    
  ],
  templateUrl: './perfil.component.html',
  styleUrl: './perfil.component.css',
})
export class PerfilComponent {
  user?: User;
  products?: Product[];

  goToProduct(idProduct: string) {
    console.log(idProduct);

    this.router.navigate([`/product/${idProduct}`]);
  }
  constructor(
    private authService: AuthService,
    private ps: ProductsService,
    private router: Router
  ) {
    this.authService.getUser().then((userCurrent) => {
      if (userCurrent) {
        this.user = userCurrent;

        this.ps.getProductByIDUser(userCurrent.uid).subscribe((products) => {
          this.products = products;
        });
      }
    });
  }

  editProduct(id: string) {

    this.router.navigate([`/update-product/${id}`]);
  }
  deleteProduct(id: string) {
    const swalWithBootstrapButtons = Swal.mixin({
      customClass: {
        confirmButton: "btn btn-success",
        cancelButton: "btn btn-danger"
      },
      buttonsStyling: false
    });
    swalWithBootstrapButtons.fire({
      title: "Estas seguro",
      text: "No podras revertir esto",
      icon: "warning",
      showCancelButton: true,
      confirmButtonText: "Si, borrarlo!",
      cancelButtonText: "No, cancelar!",
      reverseButtons: true
    }).then((result) => {
      if (result.isConfirmed) {


        
        this.ps.deleteProduct(id);
        swalWithBootstrapButtons.fire({
          title: "Borrado!",
          text: "Tu producto ha sido borrado.",
          icon: "success"
        });
      } else if (
        /* Read more about handling dismissals below */
        result.dismiss === Swal.DismissReason.cancel
      ) {
        swalWithBootstrapButtons.fire({
          title: "Cancelado",
          text: "Tu producto esta a salvo :)",
          icon: "error"
        });
      }
    });
    console.log(id);
  }
}
