import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'TeamTask';
    //user$ = this.usersService.currentUserProfile$;
  isLogin=true;
  constructor(
   private router: Router
  ) {}
 
}
