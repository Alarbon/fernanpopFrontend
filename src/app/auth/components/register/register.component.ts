import { Component, OnInit } from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { AuthService } from '../../../services/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-register',
  standalone: true,
  imports: [ReactiveFormsModule],
  templateUrl: './register.component.html',
  styleUrl: './register.component.css',
})
export class RegisterComponent implements OnInit {
  formRegister: FormGroup;
  errorName?: string;
  errorEmail?: string;
  errorPass?: string;
  errorTerms: boolean = false;

  constructor(
    private authService: AuthService,
    private router: Router,
    private fb: FormBuilder
  ) {
    this.formRegister = this.fb.group({
      nameUser: ['', [Validators.required]],
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required]],
      termsChecked: [false, [Validators.requiredTrue]],
    });
  }

  ngOnInit(): void {}

  registerUser() {
    if (this.formRegister.value.nameUser == '') {
      this.errorName = 'El campo no puede estar vacío';

      return;
    } else {
      this.errorName = undefined;
    }
    if (this.formRegister.value.email === '') {
      this.errorEmail = 'El campo no puede estar vacío';
      return;
    } else {
      this.errorEmail = undefined;
    }

    //verifico que el email sea valido
    if (
      !this.formRegister.value.email.match(
        /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/
      )
    ) {
      this.errorEmail = 'El email no es válido';
      return;
    }

    if (this.formRegister.value.password === '') {
      this.errorPass = 'El campo no puede estar vacío';
      return;
    }
    if (this.formRegister.value.password.length < 8) {
      this.errorPass = 'La contraseña debe tener al menos 8 caracteres';
      return;
    } else {
      this.errorPass = undefined;
    }

    if (!this.formRegister.value.termsChecked) {
      this.errorTerms = true;
      return;
    }

    this.authService
      .registerEmail(
        this.formRegister.value.email,
        this.formRegister.value.password,
        this.formRegister.value.nameUser
      )
      .then((res) => {
        if (res) {
          this.router.navigate(['home']);
        } else {
          this.errorEmail = 'El email ya está en uso';
        }
      });
  }

  async onClick() {
    if (await this.authService.loginGoogle()) {
      this.router.navigate(['home']);
    }
  }

  redirectLogin() {
    this.router.navigate(['login']);
  }

  redirectToHome() {
    this.router.navigate(['/home']);
  }

  toggleTerms() {
    if (this.errorTerms) {
      this.errorTerms = false;
    }
  }
}
