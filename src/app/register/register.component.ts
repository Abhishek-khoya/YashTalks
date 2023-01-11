import { Component,OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { getDatabase } from "firebase/database";

import {
  AbstractControl,
  ValidationErrors,
  ValidatorFn
} from '@angular/forms';
import { FirebaseService } from '../services/firebase.service';
import { Database, set, ref } from 'firebase/database';
import { RegisterService } from '../services/register.service';
import { SignInUser } from '../models/user';

export function passwordsMatchValidator(): ValidatorFn {
  return (control: AbstractControl): ValidationErrors | null => {
    const password = control.get('password')?.value;
    const confirmPassword = control.get('confirmPassword')?.value;

    if (password && confirmPassword && password !== confirmPassword) {
      return { passwordsDontMatch: true };
    } else {
      return null;
    }
  };
}
@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent /*implements OnInit*/ {
  studentService: any;
  // obj:SignInUser=new SignInUser();
  emp: any;
  constructor(private registerService: RegisterService ,private firebaseService: FirebaseService, private router: Router, private formBuilder: FormBuilder, private snackBar: MatSnackBar) { }
  userForm!: FormGroup;
  hide = true;
  hide1 = true;
  ngOnInit(): void {
    this.userForm = this.formBuilder.group({
      firstName: ['', [Validators.required, Validators.maxLength(32), Validators.minLength(3)]],
      lastName: ['', [Validators.required, Validators.maxLength(32), Validators.minLength(3)]],
      phoneNumber: ['', [Validators.required, Validators.pattern("^((\\+91-?)|0)?[0-9]{10}$")]],
      email: ['', [Validators.required, Validators.email]],
      displayName: ['', [Validators.required, Validators.minLength(6), Validators.maxLength(32), Validators.pattern('^[A-Za-z0-9!@#$%^&*()]+$')]],
      password: ['', [Validators.required, Validators.minLength(6), Validators.maxLength(32), Validators.pattern('^[A-Za-z0-9!@#$%^&*()]+$')]],
      confirmPassword: ['', [Validators.required, Validators.minLength(6), Validators.maxLength(32), Validators.pattern('^[A-Za-z0-9!@#$%^&*()]+$')]]
    }, { validators: passwordsMatchValidator() })
  }
  OnSubmit(){
    console.log(this.userForm.value);
    this.emp.Empsave(this.userForm.value).subscribe();
  }
  // detailsuser(){
  //   this.obj.firstName=this.userForm.value.firstName;
  //   this.obj.lastName=this.userForm.value.lastName;
    
  //   this.registerService.postdata(this.obj)
  //   .subscribe(res=>{
  //     console.log(res);
  //     alert("success");
  //   });


  

  registerUser() {
    if (this.userForm.valid) {
      this.registerService.postdata(this.userForm.value).subscribe({
        next:(response)=>{
          console.log(`${response}`);
        },
      error:(response)=>{
        console.log(`${response}`);
      }}
      );
      this.firebaseService.signUp(this.userForm.value)
        .subscribe({
          next: () => {
            const db = getDatabase();
            set(ref(db, 'users/' + this.userForm.value.displayName), {
              firstName: this.userForm.value.firstName,
              lastName: this.userForm.value.lastName,
              email: this.userForm.value.email,
              phoneNumber: this.userForm.value.phoneNumber,
              password: this.userForm.value.password
            });
            this.snackBar.open('Sign Up Successfully', 'OK', {
              duration: 3000
            });
            this.userForm.reset();
            this.router.navigate(['/login']);

          }, error: ({ message }) => {
            this.snackBar.open(`${message}`, 'OK', {
              duration: 3000
            })
          }
        });
    }
  }
}


