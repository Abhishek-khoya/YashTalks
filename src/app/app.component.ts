import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { FirebaseService } from './services/firebase.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'YashTalks';
  //user$ = this.usersService.currentUserProfile$;
  isLogin=true;
  constructor(
    public firebaseService: FirebaseService,
    //public usersService: UsersService,
    private router: Router
  ) {}

  logout() {
    this.firebaseService.logout().subscribe(() => {
      this.isLogin=true;
      this.router.navigate(['login']);
    });
  }
}
