import { Component } from '@angular/core';
import { getDatabase, ref, onValue } from 'firebase/database';
import { ContactService } from 'src/app/services/contact.service';
import { MatMenuTrigger } from '@angular/material/menu';
import { MatDialog } from '@angular/material/dialog';
import { EditContactComponent } from '../edit-contact/edit-contact.component';

@Component({
  selector: 'app-list-contact',
  templateUrl: './list-contact.component.html',
  styleUrls: ['./list-contact.component.css']
})
export class ListContactComponent {

  contacts:any=[];
  constructor(private contactService:ContactService,private dialog:MatDialog)
  {

  }
  ngOnInit()
  {
   this.getAllContact()
//     const db = getDatabase();
//   const starCountRef = ref(db, 'contacts/');
//   onValue(starCountRef, (snapshot) => {
//   const data = snapshot.val();
//   console.log(data);
//   this.contacts=data;
// });
    
  }
  getAllContact()
    {
      this.contactService.getAllContacts().subscribe({next:(response)=>{
        console.log(response);
        this.contacts=response;
      },error:(response)=>{
        console.log(`${response}`);
      }});

    }
  updateContact(item:any)
  {
    this.dialog.open(EditContactComponent,{
      width:'auto',
      height:'auto',
      data:item
    }).afterClosed().subscribe((val)=>{
      if(val==='update'){
        this.getAllContact();
      }
    })
  }
  deleteContact(contact:any)
  {
    if(confirm('Are you sure ??'))
    {
      this.contactService.deleteContact(contact.id).subscribe(data=>{
        alert("Contact Deleted!");
        this.getAllContact();
      })
    }
  }
}
