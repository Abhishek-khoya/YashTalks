import { Component } from '@angular/core';
import { FormControl } from '@angular/forms';
import { getDatabase, ref, onValue} from "firebase/database";
import { SignUpUser } from '../models/user';
import { UserService } from '../services/user.service';
import { FirebaseApp, initializeApp } from 'firebase/app';

@Component({
  selector: 'app-chating',
  templateUrl: './chating.component.html',
  styleUrls: ['./chating.component.css']
})

export class ChatingComponent 
{
  // users:any[]=[];
  // searchControl = new FormControl('');
  // messageControl = new FormControl('');
  // chatListControl = new FormControl('');
  // constructor(private userService:UserService){}
  // ngOnInit()
  // {
  //   this.userService.getAllUsers().subscribe({next:(response)=>{
  //     console.log(response);
  //     this.users.push(response);
  //     console.log(this.users)
  //   },error:(response)=>{
  //     console.log(`${response}`);
  //   }});
  // }
  // createChat(user:SignUpUser)
  // {

  // }
}
