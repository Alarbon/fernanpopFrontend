import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { Router, RouterModule } from '@angular/router';
import { AuthService } from '../../../services/auth.service';
import { User } from '@angular/fire/auth';
import { NavBarComponent } from '../../../fernanpop/components/nav-bar/nav-bar.component';

@Component({
  selector: 'app-chat',
  standalone: true,
  imports: [CommonModule, RouterModule,NavBarComponent],
  templateUrl: './chat.component.html',
})
export class ChatComponent {
  user?: User;
  constructor(private authService: AuthService, private router: Router) {
    this.authService.getUser().then((userCurrent) => {
      if (userCurrent) {
        this.user = userCurrent;
      }
    });
  }

  menssage = '';
  sendMessage() {
    console.log(this.user);
  }
}
