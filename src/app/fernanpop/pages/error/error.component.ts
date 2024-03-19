import { Component } from '@angular/core';
import { RouterModule } from '@angular/router';
import { NavBarComponent } from '../../components/nav-bar/nav-bar.component';

@Component({
  selector: 'app-error',
  standalone: true,
  imports: [ErrorComponent, RouterModule, NavBarComponent],
  templateUrl: './error.component.html',
  styleUrl: './error.component.css',
})
export class ErrorComponent {}
