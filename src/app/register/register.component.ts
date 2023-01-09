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
import { FirebaseService } from '../services/firebase.service';

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
export class RegisterComponent {
  studentService: any;
  constructor(private firebaseService: FirebaseService, private router: Router, private formBuilder: FormBuilder, private snackBar: MatSnackBar) { }
  userForm!: FormGroup;
  hide = true;
  hide1 = true;
  ngOnInit(): void {
    this.userForm = this.formBuilder.group({
      firstName: ['', [Validators.required, Validators.maxLength(32), Validators.minLength(3)]],
      lastName: ['', [Validators.required, Validators.maxLength(32), Validators.minLength(3)]],
      phoneNumber: ['', [Validators.required, Validators.pattern("^((\\+91-?)|0)?[0-9]{10}$")]],
      email: ['', [Validators.required, Validators.email]],
      userName: ['', [Validators.required, Validators.minLength(6), Validators.maxLength(32), Validators.pattern('^[A-Za-z0-9!@#$%^&*()]+$')]],
      password: ['', [Validators.required, Validators.minLength(6), Validators.maxLength(32), Validators.pattern('^[A-Za-z0-9!@#$%^&*()]+$')]],
      confirmPassword: ['', [Validators.required, Validators.minLength(6), Validators.maxLength(32), Validators.pattern('^[A-Za-z0-9!@#$%^&*()]+$')]]
    }, { validators: passwordsMatchValidator() })
  }
  registerUser() {
    if (this.userForm.valid) {
      const firstName = this.userForm.value.firstName;
      const lastName = this.userForm.value.lastName;
      const phoneNumber = this.userForm.value.phoneNumber;
      const email = this.userForm.value.email;
      const userName = this.userForm.value.userName;
      const password = this.userForm.value.password;
      const confirmPassword = this.userForm.value.confirmPassword;

      if (this.userForm.valid) {
        this.firebaseService.signUp(email, password)
          .subscribe({
            next: () => {
              // this.router.navigate(['login']);
              this.snackBar.open('Sign Up Successfully', 'OK', {
                duration: 3000
              });
              this.router.navigate(['/login']);
              this.userForm.reset()
            }, error: () => {
              this.snackBar.open('User already exists', 'OK', {
                duration: 3000
              })
            }
          });
      }
    }
    //   this.studentService.registerStudent(this.userForm.value).subscribe({
    //     next:()=>{this.snackBar.open('User Registered', 'OK', {
    //     duration: 3000
    //   });
    //   this.router.navigate(['login']);
    //   this.userForm.reset()},
    // error:()=>{
    //   this.snackBar.open('User Not Registered', 'OK', {
    //     duration: 3000
    //   });
    // }});
  }
}

