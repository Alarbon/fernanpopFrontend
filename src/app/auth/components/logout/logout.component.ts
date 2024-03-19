import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../../services/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-logout',
  standalone: true,
  imports: [],
  templateUrl: './logout.component.html',
  styleUrl: './logout.component.css',
})
export class LogoutComponent implements OnInit {
  constructor(public userService: AuthService, private router: Router) {}

  ngOnInit(): void {}

  onClick() {
    this.userService.logout();
    this.router.navigate(['login']);
  }

  redirectToHome() {
    this.router.navigate(['home']);
  }
}
