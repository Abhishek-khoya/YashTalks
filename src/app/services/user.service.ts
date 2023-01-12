import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  url="https://yashtalks-default-rtdb.firebaseio.com/users.json"
  constructor(private http:HttpClient) { }
  getAllUsers()
  {
    return this.http.get(this.url)
  }
}
