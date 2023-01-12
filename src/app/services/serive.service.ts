import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { ContactClass } from 'src/app/models/contactclass';
@Injectable({
  providedIn: 'root'
})
export class SeriveService {
  baseApiUrl:string="http://localhost:3000"
  constructor(private http:HttpClient ) { }

  get() {
    return this.http.get<ContactClass[]>('http://localhost:3000/contacts');
  }
  createContact(contactfrm: ContactClass) {
    console.log(contactfrm);
    return this.http.post<ContactClass>(this.baseApiUrl+"/contacts", contactfrm);
  }
  getById(id: number) {
    return this.http.get<ContactClass>(`http://localhost:3000/contacts/${id}`);
   }
   getcontact(id:number):Observable<ContactClass>{
    return this.http.get<ContactClass>(this.baseApiUrl+"/contacts/"+id);
  }
   update(conct:ContactClass){
    return this.http.put(`http://localhost:3000/contacts/${conct.id}`,conct);
   }
   getContact(id:string):Observable<ContactClass>{
    return this.http.get<ContactClass>(this.baseApiUrl+"/contacts/"+id);
  }
  updateContact(id:number,updateconactdetails:ContactClass ):Observable<ContactClass>
  {
    return this.http.put<ContactClass>(this.baseApiUrl+"/contacts/"+id,updateconactdetails);
  }
  deleteContact(id:string):Observable<ContactClass>
  {
    return this.http.delete<ContactClass>(this.baseApiUrl+"/contacts/"+id);
  }
  // create(conct: ContactClass) {
  //   return this.http.post<ContactClass>('http://localhost:3000/contacts', conct);
  // }
  // addcontacts(addcontact:any):Observable<any>
  // {
  //   return this.http.post<any>(this.baseApiUrl+"/Contacts",addcontact); 
  // }
}
