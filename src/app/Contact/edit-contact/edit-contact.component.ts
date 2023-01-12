import { Component, Inject } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Router, ActivatedRoute } from '@angular/router';
import { ContactService } from 'src/app/services/contact.service';
import { AddContactComponent } from '../add-contact/add-contact.component';

@Component({
  selector: 'app-edit-contact',
  templateUrl: './edit-contact.component.html',
  styleUrls: ['./edit-contact.component.css']
})
export class EditContactComponent {
  constructor(private dialogRef:MatDialogRef<EditContactComponent>,@Inject(MAT_DIALOG_DATA) public editData:any,private contactService:ContactService,private router:Router, private formBuilder:FormBuilder,private  route :ActivatedRoute){}
  contactForm!:FormGroup;
  ngOnInit()
  {
    this.contactForm=this.formBuilder.group({
      name: ['',[Validators.required]],
      email : ['', [Validators.required, Validators.email]],
      mobileno:['',[Validators.required,Validators.minLength(10),Validators.maxLength(10)]],
      })
      console.log(this.editData);
      if(this.editData)
      {
         this.contactForm.controls['name'].setValue(this.editData.name);
         this.contactForm.controls['mobileno'].setValue(this.editData.mobileno);
         this.contactForm.controls['email'].setValue(this.editData.email);
      }
  }
  updateContact()
  {
    this.contactService.updateContact(this.editData.id,this.editData).subscribe({
      next:(res)=>{
        alert("Contact Updated Successfully");
        this.contactForm.reset();
        this.dialogRef.close('update');
      },
      error:()=>{alert("Contact Not Updated")}
    }) 
  }
  
}
