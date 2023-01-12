import { HttpClient, HttpHeaderResponse, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ContactService {
  constructor(private http:HttpClient) { }
  baseApiUrl="http://localhost:3000"
  getAllContacts()
  {
    return this.http.get<any[]>(this.baseApiUrl+"/contacts")
  }
  createContact(addContactRequest:any):Observable<any>
  {
    return this.http.post<any>(this.baseApiUrl+"/contacts",addContactRequest); 
  }
  getContact(id:string):Observable<any>{
    return this.http.get<any>(this.baseApiUrl+"/contacts/"+id);
  }
  updateContact(id:number,updateContactRequest:any ):Observable<any>
  {
    return this.http.put<any>(this.baseApiUrl+"/contacts/"+id,updateContactRequest);
  }
  deleteContact(id:string):Observable<any>
  {
    return this.http.delete<any>(this.baseApiUrl+"/contacts/"+id);
  }
}
