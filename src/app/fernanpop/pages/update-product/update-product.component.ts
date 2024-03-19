import { Component, signal } from '@angular/core';
import { NavBarComponent } from '../../components/nav-bar/nav-bar.component';
import {
  FormBuilder,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { ActivatedRoute, Router, RouterModule } from '@angular/router';
import { AuthService } from '../../../services/auth.service';
import { ProductsService } from '../../../services/products.service';
import { Product } from '../../../interfaces/product';

@Component({
  selector: 'app-update-product',
  standalone: true,
  imports: [NavBarComponent, ReactiveFormsModule, RouterModule],
  templateUrl: './update-product.component.html',
  styleUrl: './update-product.component.css',
})
export class UpdateProductComponent {
  formUpdate: FormGroup;
  product = signal<Product | undefined>(undefined);

  errorName?: string;
  errorPrice?: string;
  errorDescription?: string;
  errorCategory?: string;
  errorStatus?: string;
  errorImage?: string;

  constructor(
    private ps: ProductsService,
    private router: Router,
    private activatedRoute: ActivatedRoute,
    private fb: FormBuilder
  ) {
    this.activatedRoute.params.subscribe(({ id }) => {
      console.log(id);

       this.ps.getProductByID(id);
      this.product =  this.ps.selectedProduct;
    });

    console.log(this.product());

    this.formUpdate = this.fb.group({
      nameProduct: [this.product()?.name, [Validators.required]],
      price: [this.product()?.price, [Validators.required]],
      description: [this.product()?.description, [Validators.required]],
      category: [this.product()?.category, [Validators.required]],
      status: [this.product()?.status, [Validators.required]],
      image: [this.product()?.image, [Validators.required]],
    });
  }

  updateProduct() {
    this.validateForm();
    if (
      this.errorName ||
      this.errorPrice ||
      this.errorDescription ||
      this.errorCategory ||
      this.errorStatus ||
      this.errorImage
    ) {
      return;
    } else {
      const product: Product = {
        name: this.formUpdate.value.nameProduct,
        price: this.formUpdate.value.price,
        description: this.formUpdate.value.description,
        category: this.formUpdate.value.category,
        status: this.formUpdate.value.status,
        image: this.formUpdate.value.image,
      };

      this.ps.updateProduct(this.product()?._id?.toString() || '', product);

      this.router.navigate(['/perfil']);
    }
  }
  validateForm() {
    console.log(this.formUpdate.value.nameProduct);

    if (this.formUpdate.value.nameProduct === '') {
      this.errorName = 'El campo no puede estar vacío';
    } else {
      this.errorName = undefined;
    }
    if (this.formUpdate.value.price === '') {
      this.errorPrice = 'El campo no puede estar vacío';
    } else {
      this.errorPrice = undefined;
    }
    if (this.formUpdate.value.description === '') {
      this.errorDescription = 'El campo no puede estar vacío';
    } else {
      this.errorDescription = undefined;
    }
    if (this.formUpdate.value.category === '') {
      this.errorCategory = 'El campo no puede estar vacío';
    } else {
      this.errorCategory = undefined;
    }
    if (this.formUpdate.value.status === '') {
      this.errorStatus = 'El campo no puede estar vacío';
    } else {
      this.errorStatus = undefined;
    }
    if (this.formUpdate.value.image === '') {
      this.errorImage = 'El campo no puede estar vacío';
    } else {
      this.errorImage = undefined;
    }
  }
}
