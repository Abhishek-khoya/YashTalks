import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import {
  AbstractControl,
  FormControl,
  NonNullableFormBuilder,
  ValidationErrors,
  ValidatorFn
} from '@angular/forms';
import { SeriveService } from 'src/app/service/serive.service';
@Component({
  selector: 'app-create-contact',
  templateUrl: './create-contact.component.html',
  styleUrls: ['./create-contact.component.css']
})
export class CreateContactComponent {
  studentService: any;
  constructor(private router: Router,private cs:SeriveService, private formBuilder: FormBuilder, private snackBar: MatSnackBar) { }
  contactForm!: FormGroup;
  hide = true;
  hide1 = true;
  ngOnInit(): void {
    this.contactForm = this.formBuilder.group({
      //id:[0],
      name: ['', [Validators.required, Validators.maxLength(32), Validators.minLength(3)]],
      mobileno: ['', [Validators.required, Validators.pattern("^((\\+91-?)|0)?[0-9]{10}$")]],
      email: ['', [Validators.required, Validators.email]],
     })
  }
  CreateContact() {
    if (this.contactForm.valid) {
      if (this.contactForm.valid) {
        this.cs.createContact(this.contactForm.value)
          .subscribe({
            next: () => {
              this.snackBar.open('Created Successfully', 'OK', {
                duration: 1000
              });
              this.router.navigate(['/contacts/contacts-list']);
              this.contactForm.reset()
            }});
      }
    }
}
}
