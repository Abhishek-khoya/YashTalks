import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { FirebaseService } from './services/firebase.service';
import { MatDialog, MatDialogModule } from '@angular/material/dialog';
import { DetailsComponent } from './details/details.component';
import { LoginComponent } from './login/login.component';
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent {
  title = 'YashTalks';
  //user$ = this.usersService.currentUserProfile$;
  isLogin=true;
  // loginDetails!:LoginComponent
  constructor(
    public firebaseService: FirebaseService,
    //public usersService: UsersService,
    private router: Router,
    private dialog:MatDialog,
    
  ) {}
    loginInfo:any;
    reciveObject($event:any)
    {
      this.loginInfo=$event;
      
    }
  logout() {
    this.firebaseService.logout().subscribe(() => {
      this.isLogin=true;
      this.router.navigate(['login']);
    });
  }
  openDialog()
  {
    // console.log(this.loginDetails.viewUserData);
    this.dialog.open(DetailsComponent,{
      width:'40%',
      height:'45%',
      data:""
      

      
    });   
  }
  
}
