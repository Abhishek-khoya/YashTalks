import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ContactClass } from 'src/app/models/contactclass';
import { SeriveService } from 'src/app/service/serive.service';
// import { MatDialogRef } from '@angular/material/dialog';
@Component({
  selector: 'app-add-contact',
  templateUrl: './add-contact.component.html',
  styleUrls: ['./add-contact.component.css']
})
export class AddContactComponent  implements OnInit {
  submitted = false;
 // contactfrm!:FormGroup;
  fDate:any; 
  contactfrm: ContactClass = {
    contactId: 0,
    contactName: '',
    emailAddress: '',
    phoneNumber: 0,
  };
  addcontact:ContactClass=
  {
    contactId:0,
    contactName: "",  
    emailAddress: "",
    phoneNumber: 0};
  constructor(private fb:FormBuilder,private router:Router,private cs:SeriveService){ }
  namePattern!:"^[a-zA-Z ]{2,20}$";
  allContacts: ContactClass[] = [];
 
ngOnInit(): void {
  // this.contactfrm=this.fb.group({
  //   contactId:[''],
  //   contactName: ['',[Validators.required,Validators.pattern(this.namePattern),Validators.minLength(3)]],
  //   emailAddress : ['', [Validators.required, Validators.email]],
  //   phoneNumber:['',[Validators.required,Validators.pattern("^((\\+91-?)|0)?[0-9]{10}$")]],
  //  })
  
}
create(){
  this.cs.createContact(this.contactfrm)
  .subscribe({
    next:(data) => {
      alert("Employee Added Successfully");
    },
    error:(err) => {
      console.log(err);
    }
  })
}

addContact()
  {
    // if(this.contactfrm.valid)
    // {
    //   console.log(this.contactfrm.value);
    //    this.cs.addcontacts(this.contactfrm.value).subscribe({next:()=>{
    //     alert("Employee Added Successfully");
    //     this.contactfrm.reset();
    //    // this.dialogRef.close('save');
    //   }});
    //}
  }
  get() {
    this.cs.get().subscribe((data) => {
      this.allContacts = data;
    });
}
}
