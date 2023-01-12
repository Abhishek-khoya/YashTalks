import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { AddContactComponent } from './contact/add-contact/add-contact.component';
import { DetailsComponent } from './details/details.component';
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
    private router: Router,
    private http:HttpClient,
    private dialog:MatDialog
  ) {}

  logout() {
    //this.http.delete(`https://yashtalks-default-rtdb.firebaseio.com/chats.json`).subscribe()
    this.firebaseService.logout().subscribe(() => {
      this.isLogin=true;
      this.router.navigate(['login']);
    });
  }
  addContact()
  {
    this.dialog.open(AddContactComponent,{
      height:'auto',
      width:'auto'
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
