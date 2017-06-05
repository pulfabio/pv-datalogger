import {Component} from '@angular/core';
import {FormGroup, AbstractControl, FormBuilder, Validators} from '@angular/forms';

import 'style-loader!./login.scss';

import {Router} from '@angular/router'
import {AuthService} from '../../../shared/services/auth.service';

@Component({
  selector: 'login',
  templateUrl: './login.html',
})
export class Login {

  public form:FormGroup;
  public email:AbstractControl;
  public password:AbstractControl;
  public submitted:boolean = false;
  public error:boolean=false;
  public errorMessage:string='';

  constructor(fb:FormBuilder, private auth:AuthService, private router:Router) {
    this.form = fb.group({
      'email': ['', Validators.compose([Validators.required, Validators.minLength(4)])],
      'password': ['', Validators.compose([Validators.required, Validators.minLength(4)])]
    });

    this.email = this.form.controls['email'];
    this.password = this.form.controls['password'];
  }

  public onSubmit(values:any):void {
    this.submitted = true;
    if (this.form.valid) {
      // your code goes here
      // console.log(values);
      this.auth.login({username:values.email, password:values.password}).subscribe(
        res => {
        if(res.status === 200){
          this.router.navigate(['pages']);
        }
      }, err => {
        //do something with error
        this.error = true;
        this.errorMessage = err.json().message;
      })
    }
  }
}
