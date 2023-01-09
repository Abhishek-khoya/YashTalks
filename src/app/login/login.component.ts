import { Component } from '@angular/core';
import { user } from '@angular/fire/auth';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { AppComponent } from '../app.component';
import { FirebaseService } from '../services/firebase.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {
  constructor(private formBuilder: FormBuilder, private router: Router, private fireBaseService: FirebaseService,private snackBar:MatSnackBar,private appComponent:AppComponent) { }
  loginForm!: FormGroup;
  loginSuccess = false;
  hide = true;
  students: any = [];
  flag = 0;
  ngOnInit(): void {
    this.loginForm = this.formBuilder.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(6), Validators.maxLength(32), Validators.pattern('^[A-Za-z0-9!@#$%^&*()]+$')]]
    })
  }
  loginUser() {
    if (this.loginForm.valid) {
    //   const email = this.loginForm.value.email;
    // const password = this.loginForm.value.password;

    this.fireBaseService.login(this.loginForm.value).subscribe({
      next: () => { 
        this.snackBar.open('Login Successfull', 'OK', {
          duration: 3000
        });
        this.appComponent.isLogin=false;
        this.router.navigate(['home']);
      },
      error: (message) => {
        this.snackBar.open(`${message}`, 'OK', {
          duration: 3000
        });
       }
    })
    }
    
  }
  // loginStudent() {
  //   if (this.loginForm.valid) {
  //     this.loginSuccess = true;
  //     this.studentService.getAllStudents().subscribe({
  //       next: (response: any) => {
  //         //console.log(response);
  //         this.students = response;
  //         this.students.forEach((student: any) => {
  //           if (this.loginForm.value.userName == student.userName && this.loginForm.value.password == student.password) {
  //             this.flag = 1;
  //             alert("Login Successfull");
  //             this.router.navigate(['']);
  //           }
  //         });
  //         if (this.flag == 0) {
  //           this.loginSuccess = false;
  //           alert("Invalid Username or Password");
  //         }

  //       }, error: () => { alert("Login Failed") }
  //     });

  //   }
  // }

}
