import { Component, OnInit } from '@angular/core';
import { note } from './model/note.model';



@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {


  //initial Notes
  notes: note[] = [
    { id: 1, title: "first", note: "this is my first Post", date: new Date(), done : false },
  ]
  // initial trash Notes
  trashNotes: note[] = [
    { id: 2, title: "second", note: "this is my second Post", date: new Date(),done:false},
  ]

  //initial data at localstorage
  ngOnInit() {
    // checking if data is present or not in localStorage
    if (localStorage.getItem('notes') && localStorage.getItem('trashNotes')) {
      // do nothing
      console.log("data already set in localstorage");
    } else {
      console.log("data  set in localstorage");
     // data setting to localStrorage 
      localStorage.setItem('notes', JSON.stringify(this.notes));
      localStorage.setItem('trashNotes', JSON.stringify(this.trashNotes));
    }

  }

}
