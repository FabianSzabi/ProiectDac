// import { Component, OnInit } from '@angular/core';
// import { FormBuilder, FormGroup, Validators } from '@angular/forms';
// import { MatSnackBar } from '@angular/material/snack-bar';
// import { Router, RouterModule } from '@angular/router';
// import { AuthService } from '../core/api/auth.service';
// import { StorageHelper } from '../core/helpers/storage.helper';

// @Component({
//   selector: 'app-login-form',
//   templateUrl: './login-form.component.html',
//   styleUrls: ['./login-form.component.less']
// })
// export class LoginFormComponent implements OnInit {

//   hide = true;
//   loginFormInstance: FormGroup = new FormGroup({});
  
//   constructor(
//     private formBuilder: FormBuilder,
//     private authService: AuthService,
//     private _snackBar: MatSnackBar,
//     private router: Router
//     ) { }

//   ngOnInit(): void {
//     this.initForm();
//   }

//   initForm(){
//     this.loginFormInstance = this.formBuilder.group({
//       email: ["eve.holt@reqres.in",Validators.required],
//       password: ["cityslicka",Validators.required]
//     })
//   }

//   onLogin(){
//     if(this.loginFormInstance.invalid)
//     {
//       return;
//     }
//     this.authService.login({email: this.email.value, password: this.password.value}).subscribe((response:any) => {
//       StorageHelper.setToken(response.token);
//       (<any>this.router).navigate(["/homepage"])
//     }, error => {
//       console.log(error)
//       console.log(error.error.error)
//       this.openSnackBar(error.error.error,"login");
      
//     });

//   }

//   openSnackBar(message: string, action: string) {
//     this._snackBar.open(message, action);
//   }

//   get email(){
//     return this.loginFormInstance.get("email");
//   }

//   get password(){
//     return this.loginFormInstance.get("password");
//   }
// }
import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormGroup} from '@angular/forms';
import {HttpClient} from '@angular/common/http';
import {Router} from '@angular/router';
import { AuthService } from '../core/api/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login-form.component.html',
  styleUrls: ['./login-form.component.less']
})
export class LoginFormComponent implements OnInit {
  form: FormGroup;

  constructor(
    private formBuilder: FormBuilder,
    private http: HttpClient,
    private router: Router,
    private authService: AuthService,
  ) {
  }

  ngOnInit(): void {
    this.form = this.formBuilder.group({
      email: '',
      password: ''
    });
  }

  submit(): void {
    //(<any>this.router).navigate(["/table"]);
    
     this.http.post('http://localhost:8000/api/login', this.form.getRawValue(), {
       withCredentials: true
     }).subscribe(() => this.router.navigate(['/homepage']));
    
  }
}
