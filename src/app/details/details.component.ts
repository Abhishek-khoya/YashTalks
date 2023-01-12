import { Component, ViewChild } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { LoginComponent } from '../login/login.component';
import { FirebaseService } from '../services/firebase.service';
import { RegisterService } from '../services/register.service';

@Component({
  selector: 'app-details',
  templateUrl: './details.component.html',
  styleUrls: ['./details.component.css']
})
export class DetailsComponent {
  @ViewChild(LoginComponent) login: any;
  viewUser :any=[];
  todoList: any;
  id: any;
  name:any;
  constructor(private auth:FirebaseService,private registerService:RegisterService,private readonly route:ActivatedRoute){ }
  ngOnInit(): void {
    
   
    this.id=this.auth.currentUser$.subscribe({next:(useData)=>{console.log(useData);
      this.id=useData?.email;
      this.name=useData?.displayName;

      console.log(useData?.email);
      this.viewUser=this.registerService.getalldata().subscribe({next:(showData:any)=>{console.log(showData);
        this.viewUser=showData;
        this.viewUser.forEach((data:any) => {
          if(this.id==data.email)
          {
            this.todoList=data;
           // this.registerService.getLoginDetails(this.todoList);
            console.log(this.todoList);
            // this.userData=this.viewUserData;
            // console.log(this.userData);

          }})
      }})
}});
}
}
