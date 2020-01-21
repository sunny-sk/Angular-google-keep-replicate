import { Component, OnInit } from '@angular/core';
import { Route, Router } from '@angular/router';

@Component({
  selector: 'app-feedback',
  templateUrl: './feedback.component.html',
  styleUrls: ['./feedback.component.css']
})
export class FeedbackComponent{

  visible :boolean = false;

  constructor(private router:Router) { }

  onSubmit(){
    this.visible = true;
    setTimeout(() => {
      this.router.navigate(['/']);
    },1000)
  }
}
