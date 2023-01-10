import { Component, Inject } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ActivatedRoute, Router } from '@angular/router';
import { ContactClass } from 'src/app/models/contactclass';
import { SeriveService } from 'src/app/service/serive.service';
import { CreateContactComponent } from '../create-contact/create-contact.component';
@Component({
  selector: 'app-edit-contact',
  templateUrl: './edit-contact.component.html',
  styleUrls: ['./edit-contact.component.css']
})
export class EditContactComponent {
  // contactForm: ContactClass = {
  //   id: 0,
  //   name: '',
  //   email: '',
  //   mobileno: 0,
  // };
  contactForm!:FormGroup;
  cnctform: ContactClass = {
    id: 0,
    name: '',
    email: '',
    mobileno: 0,
  };
  id:number | undefined;
  dialogRef: any;
 // constructor(private dialogRef:MatDialogRef<CreateContactComponent>,@Inject(MAT_DIALOG_DATA) public editData:any,private cservice:SeriveService,private router:Router, private formBuilder:FormBuilder,private  route :ActivatedRoute,private snackBar: MatSnackBar){}
    constructor(private formBuilder: FormBuilder,private cs:SeriveService,private router:Router,private route: ActivatedRoute,private snackBar: MatSnackBar) {}
   contactDetails :ContactClass={
    id: 0,
    name: "",
    email: "",
    mobileno: 0,
    }
  ngOnInit():void{
    this.route.paramMap.subscribe((param) => {
      var id = Number(param.get('id'));
      this.getById(id);
    });
    this.id = this.route.snapshot.params['id'];
    this.contactForm=this.formBuilder.group({
      name: ['',[Validators.required]],
      email : ['', [Validators.required, Validators.email]],
      mobileno:['',[Validators.required,Validators.minLength(10),Validators.maxLength(10)]],
      })
    // console.log(this.editData);
    // if(this.editData)
    // {
    //    this.contactForm.controls['name'].setValue(this.editData.name);
    //    this.contactForm.controls['email'].setValue(this.editData.email);
    //    this.contactForm.controls['mobileno'].setValue(this.editData.mobileno);
    //   }
  }
  getById(id: number) {
    this.cs.getById(id).subscribe((data) => {
      this.cnctform = data;
    });
  }
  update() {
    this.cs.update(this.cnctform)
    .subscribe({
      next:(data) => {
        this.router.navigate(["/contacts/contactslist"]);
      },
      error:(err) => {
        console.log(err);
      }
    })
  }
  updateContact()
  {
    // this.contactDetails.id=this.editData.id
    // this.contactDetails.name=this.contactForm.value.designation;
    // this.contactDetails.email=this.contactForm.value.email;
    // this.contactDetails.mobileno=this.contactForm.value.mobileno;
    //  console.log(this.contactDetails);
    // this.cs.updateContact(this.editData.id,this.contactDetails).subscribe({
    //   next:(res)=>{
    //     alert("contact Updated Successfully");
    //     this.contactForm.reset();
    //     this.dialogRef.close('update');
    //   },
    //   error:()=>{alert("contact Not Updated")}
    // }) 
  }
//    ngOnInit(): void {
//     this.contact_form = this.formBuilder.group({
//       //id:[0],
//       name: ['', [Validators.required, Validators.maxLength(32), Validators.minLength(3)]],
//       mobileno: ['', [Validators.required, Validators.pattern("^((\\+91-?)|0)?[0-9]{10}$")]],
//       email: ['', [Validators.required, Validators.email]],
//      })
//   this.route.paramMap.subscribe((param) => {
//     var id = Number(param.get('id'));
//     this.getById(id);
//   });
// }

// getById(id: number) {
//   this.cservice.getById(id).subscribe((data) => {
//     this.contactForm = data;
//   });
// }

// update() {
//   this.cservice.update(this.contactForm)
//   .subscribe({
//     // next:(data) => {
//     //   this.router.navigate(["/contacts/contacts-list"]);
//     // },
//     next: () => {
//       this.snackBar.open('Updated Successfully', 'OK', {
//         duration: 3000
//       })}
//      });
// }
}
