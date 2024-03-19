import { Component } from '@angular/core';
import { NavBarComponent } from '../../components/nav-bar/nav-bar.component';

import { RouterModule, Router } from '@angular/router';
import { AuthService } from '../../../services/auth.service';
import { ProductsService } from '../../../services/products.service';
import { Product } from '../../../interfaces/product';
import {
  FormBuilder,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';

@Component({
  selector: 'app-upload-product',
  standalone: true,
  imports: [NavBarComponent, ReactiveFormsModule, RouterModule],
  templateUrl: './upload-product.component.html',
  styleUrl: './upload-product.component.css',
})
export class UploadProductComponent {
  formUpload: FormGroup;

  errorName?: string;
  errorPrice?: string;
  errorDescription?: string;
  errorCategory?: string;
  errorStatus?: string;
  errorImage?: string;

  constructor(
    private authService: AuthService,
    private ps: ProductsService,
    private router: Router,
    private fb: FormBuilder
  ) {
    this.formUpload = this.fb.group({
      nameProduct: ['', [Validators.required]],
      price: ['', [Validators.required]],
      description: ['', [Validators.required]],
      category: ['', [Validators.required]],
      status: ['', [Validators.required]],
      image: ['', [Validators.required]],
    });
  }

  addProduct() {
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
      let id: string = this.authService.user!.uid;
      const date = new Date();
      const product: Product = {
        name: this.formUpload.value.nameProduct,
        price: this.formUpload.value.price,
        description: this.formUpload.value.description,
        category: this.formUpload.value.category,
        status: this.formUpload.value.status,
        image: this.formUpload.value.image,
        idUser: id,
        dateOfPosting: date,
      };

      console.log(product);
     console.log(this.ps.addProduct(product));
     

      this.router.navigate(["/home"]);
    }
  }
  validateForm() {
    console.log(this.formUpload.value.nameProduct);

    if (this.formUpload.value.nameProduct === '') {
      this.errorName = 'El campo no puede estar vacío';
    } else {
      this.errorName = undefined;
    }
    if (this.formUpload.value.price === '') {
      this.errorPrice = 'El campo no puede estar vacío';
    } else {
      this.errorPrice = undefined;
    }
    if (this.formUpload.value.description === '') {
      this.errorDescription = 'El campo no puede estar vacío';
    } else {
      this.errorDescription = undefined;
    }
    if (this.formUpload.value.category === '') {
      this.errorCategory = 'El campo no puede estar vacío';
    } else {
      this.errorCategory = undefined;
    }
    if (this.formUpload.value.status === '') {
      this.errorStatus = 'El campo no puede estar vacío';
    } else {
      this.errorStatus = undefined;
    }
    if (this.formUpload.value.image === '') {
      this.errorImage = 'El campo no puede estar vacío';
    } else {
      this.errorImage = undefined;
    }
  }
}
