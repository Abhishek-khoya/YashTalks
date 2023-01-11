import { Component,Input,OnInit,ViewChild,AfterViewInit } from '@angular/core';
import { LoginComponent } from '../login/login.component';
import { authState } from '@angular/fire/auth';
import { databaseInstance$ } from '@angular/fire/database';
import { ActivatedRoute } from '@angular/router';
import { Auth } from 'firebase/auth';
import { FirebaseService } from '../services/firebase.service';
import { RegisterService } from '../services/register.service';



@Component({
  selector: 'app-details',
  templateUrl: './details.component.html',
  styleUrls: ['./details.component.css']
})
export class DetailsComponent implements OnInit{
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
      this.viewUser=this.registerService.getalldata().subscribe({next:(showData)=>{console.log(showData);
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
  
       
    

      
      //  this.fireBaseService.login(this.loginForm.value).subscribe({
      //   next: () => { 
      //     this.logindata=this.loginForm.value;
      //     this.registerData=this.registerService.getalldata().subscribe({next:(registeredData)=>{console.log(registeredData);
      //       this.registerData=registeredData;
      //       // console.log(this.registerData)
      //       this.registerData.forEach((data:any) => {
      //         if(this.loginForm.value.email==data.email)
      //         {
      //           this.viewUserData=data;
      //           this.registerService.getLoginDetails(this.viewUserData);
      //           console.log(this.viewUserData);
      //           // this.userData=this.viewUserData;
      //           // console.log(this.userData);
  
      //         }
      //        }); },error:()=>{}});
          
      //     this.snackBar.open('Login Successfull', 'OK', {
      //       duration: 3000
      //     });
      //  this.viewUser=this.registerService.getalldata().subscribe({next:(registeredData)=>{console.log(registeredData);
      //   this.viewUser=registeredData;
      //   // console.log(this.registerData)
      //   this.viewUser.forEach((data:any) => {
      //     if(this.id==data.email)
      //     {
      //       this.viewUserData=data;
      //       this.registerService.getLoginDetails(this.viewUserData);
      //       console.log(this.viewUserData);
      //       // this.userData=this.viewUserData;
      //       // console.log(this.userData);

      //     }
      //    }); },error:()=>{}});
  }
  // ngAfterViewInit(): void {
  //  this.viewUser=this.login.sendObject();
  //  console.log(this.viewUser);
  
  // }


}

 
    

