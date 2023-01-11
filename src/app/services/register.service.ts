import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map, observable } from 'rxjs';
import { SignInUser } from '../models/user';




@Injectable({
  providedIn: 'root'
})
export class RegisterService {

  constructor(private http : HttpClient) { }
  url="https://console.firebase.google.com/project/angularproject-51b50/database/angularproject-51b50-default-rtdb/data/~2F"
  postdata(data:SignInUser){
    return this.http.post<SignInUser>("http://localhost:3000/User",data)
    .pipe(map((res:any)=>{
      return res;
    }))
  }
  postlogindata(data:SignInUser){
    return this.http.post<SignInUser>("http://localhost:3000/Login",data)
    .pipe(map((res:any)=>{
      return res;
    }))
  }

  getalldata(){
    return this.http.get("http://localhost:3000/User")
  }
  getlogindata(){
    return this.http.get("http://localhost:3000/login")
  }
  getsingledata(id:String){
    return this.http.get('http://localhost:3000/User/'+id)
  }
  getdata(){
    return this.http.get(this.url);
  }
  loginInfo:any;
  getLoginDetails(loginDetails:any)
  {
    this.loginInfo=loginDetails;
  }
  forDetails()
  {
    this.loginInfo;
  }
}
