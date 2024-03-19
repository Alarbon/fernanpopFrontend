import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { Router, RouterModule } from '@angular/router';
import { AuthService } from '../../../services/auth.service';
import { HttpClientModule } from '@angular/common/http';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [ReactiveFormsModule, CommonModule, RouterModule, HttpClientModule],
  templateUrl: './login.component.html',
})
export class LoginComponent implements OnInit {
  formLogin: FormGroup;

  constructor(public authService: AuthService, private router: Router) {
    this.formLogin = new FormGroup({
      email: new FormControl(),
      password: new FormControl(),
    });
  }

  ngOnInit(): void {}

  async onSubmit() {
    if (
      await this.authService.loginEmail(
        this.formLogin.value.email,
        this.formLogin.value.password
      )
    ) {
      this.router.navigate(['home']);
    }
  }
  async redirectSing() {
    this.router.navigate(['signin']);
  }

  async redirectRegister() {
    this.router.navigate(['register']);
  }

  async loginGoogle() {
    await this.authService
      .loginGoogle()
      .then(() => {
        this.router.navigate(['home']);
      })
      .catch((error) => console.log(error));
  }

  redirectToHome() {
    this.router.navigate(['/home']);
  }
}
