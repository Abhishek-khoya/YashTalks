import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { getDatabase, set, ref, onValue } from 'firebase/database';
import { ContactService } from 'src/app/services/contact.service';

@Component({
  selector: 'app-add-contact',
  templateUrl: './add-contact.component.html',
  styleUrls: ['./add-contact.component.css']
})
export class AddContactComponent {
  constructor(private router: Router, private contactService: ContactService, private formBuilder: FormBuilder, private snackBar: MatSnackBar) { }
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
  createContact() {
    if (this.contactForm.valid) {
      this.contactService.createContact(this.contactForm.value)
        .subscribe({
          next: () => {
            this.snackBar.open('Created Successfully', 'OK', {
              duration: 1000
            });
            this.router.navigate(['/home']);
            this.contactForm.reset();
          }
        });
      // const db = getDatabase();
      // set(ref(db, 'contacts/'+this.contactForm.value.name), {
      //   name: this.contactForm.value.name,
      //   mobno: this.contactForm.value.mobileno,
      //   email: this.contactForm.value.email,
      // })
    }
  }
}
