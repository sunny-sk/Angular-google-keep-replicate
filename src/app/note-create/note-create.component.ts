import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { NotesService } from '../notes-service.service';
import { Subscription } from 'rxjs';
@Component({
  selector: 'app-note-create',
  templateUrl: './note-create.component.html',
  styleUrls: ['./note-create.component.css']
})
export class NoteCreateComponent implements OnInit {

  
  visibelReminder: boolean = false;
  fullFormVisiblity : boolean = false;
  editMode:boolean = false
  form:FormGroup;
  now = new Date();
  year = this.now.getFullYear(); 
  month = this.now.getMonth()+1;
  date =  this.now.getDate();

  private updateNote: Subscription;
  private updateNoteId:any = null;
  constructor(private noteService :NotesService) { }

  ngOnInit() {
    //Reactive Form synchronizing with form
    this.form = new FormGroup({
      'title' : new FormControl(null,{validators:[Validators.required]}),
      'note' : new FormControl(null,{validators:[Validators.required]}),
      'reminderDate' : new FormControl(null)
    })
    this.updateNote = this.noteService.getSingleNoteUpdateListenr().subscribe(note => {
      console.log(note)
      this.editMode = true
      this.onFullDisplayForm()
      this.updateNoteId = note.id
      this.form.patchValue({
        title:note.title,
        note:note.note
      })
    })
  }

  //toggling the visiblity of date picker
  visibleSetReminderForm(){
    this.visibelReminder = !this.visibelReminder;
    if(this.visibelReminder === true){
      this.form.patchValue({'reminderDate':`${this.year}-${this.month}-${this.date}`})
    }else{
      this.form.patchValue({'reminderDate':null})
    }
    }

  // create new Note 
  onAddNote(){
    if(this.form.invalid){
     
      alert("fill all fields");
    }else{
       //calling function for creating new Note
       this.noteService.setNewNote(this.form.value.title,this.form.value.note);
       //reset Form
       this.form.reset();
    } 
  }

  onUpdateNote(){
    if(this.form.invalid){
      alert("fill all fields");
    }else if(!this.updateNoteId){
      alert("no id found");
    } else{
       this.noteService.setUpdateSingleNote(this.updateNoteId,this.form.value.title,this.form.value.note);
       this.form.reset();
       this.editMode = false
    }
  }

  // on cancel creation of new Note
  onCancel(){
    this.editMode = false
    this.updateNoteId = null
    this.form.reset();
  }


  onFullDisplayForm(){
    console.log("on focus")
    this.fullFormVisiblity = true;
  }
  onFullDisplayFormBlur(e){
    console.log("on blur")
    e.preventDefault(); 
    this.form.reset();
    this.fullFormVisiblity = false;

  }

  onImagePicked(){
    console.log("image picked");
  }

  ngOnDestroy() {
    this.updateNote.unsubscribe();
  }


}
