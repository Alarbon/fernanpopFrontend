import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { Router, RouterModule } from '@angular/router';
import { AuthService } from '../../../services/auth.service';

@Component({
  selector: 'app-signin',
  standalone: true,
  imports: [ReactiveFormsModule, CommonModule, RouterModule],
  templateUrl: './signin.component.html',
  styleUrl: './signin.component.css',
})
export class SigninComponent {
  errorEmail?: string;
  errorPass?: string;

  formSignin: FormGroup;

  constructor(
    public authService: AuthService,
    private router: Router,
    private fb: FormBuilder
  ) {
    this.formSignin = this.fb.group({
      email: new FormControl('', [Validators.required, Validators.email]),
      password: new FormControl('', [Validators.required]),
    });
  }

  signin() {
    if (this.formSignin.value.email === '') {
      this.errorEmail = 'El campo no puede estar vacío';
      return;
    } else {
      this.errorEmail = undefined;
    }
    //valido que el email sea valido
    if (
      !this.formSignin.value.email.match(
        /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/
      )
    ) {
      this.errorEmail = 'El email no es valido';
      return;
    } else {
      this.errorEmail = undefined;
    }

    if (this.formSignin.value.password === '') {
      this.errorPass = 'El campo no puede estar vacío';
      return;
    }
    this.authService
      .loginEmail(this.formSignin.value.email, this.formSignin.value.password)
      .then((res) => {
        if (res) {
          this.errorPass = undefined;
          this.errorEmail = undefined;
          this.router.navigate(['/home']);
        } else {
          this.errorPass = 'El email o la contraseña son incorrectos';
        }
      });
  }
  redirectLogin() {
    this.router.navigate(['/login']);
  }
  
  redirectToHome() {
    this.router.navigate(['/home']);
  }
}
