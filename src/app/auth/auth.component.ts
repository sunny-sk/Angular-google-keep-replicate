import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-auth',
  templateUrl: './auth.component.html',
  styleUrls: ['./auth.component.css']
})
export class AuthComponent implements OnInit {

  isLoginMode: boolean = true;
  form:FormGroup;

  constructor() { }

  ngOnInit() {
    //Reactive Form synchronizing with form
    this.form = new FormGroup({
      'email' : new FormControl(null,{validators:[Validators.required]}),
      'password' : new FormControl(null,{validators:[Validators.required]}),
    })
  }

  //toggling between register and LoginIn
  onSwitchMode() {
    this.isLoginMode = !this.isLoginMode;
  }

  //on Submit form
  onSubmit() {
    if (this.form.invalid) {
      return;
    }
    if (this.isLoginMode) {
      //login
      console.log("in login  Mode");
      // more coding ...
    } else {
      //signup
      console.log("in register Mode");
      // more coding ....
    }
    this.form.reset()
  }
}
