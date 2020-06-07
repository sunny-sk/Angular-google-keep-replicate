
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { NotesService } from './../notes-service.service';
import { Component, OnInit, OnDestroy } from '@angular/core';
import { note } from '../model/note.model';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-note-list',
  templateUrl: './note-list.component.html',
  styleUrls: ['./note-list.component.css']
})
export class NoteListComponent implements OnInit, OnDestroy {
  
  form:FormGroup;
  notes: note[] = []
  private noteSubscription: Subscription;
  private refreshSubscription : Subscription;
  
  constructor(private noteService: NotesService) { }

  ngOnInit() {
    // fetching Notes
   this.notes = this.noteService.getAllNotes();
   // checking update for Notes
    this.noteSubscription = this.noteService.getPostUpdateListener().subscribe((notes) => {
      this.notes = notes;
    })
    //ReactiveForm synchronize with form 
    this.form = new FormGroup({
      'done' : new FormControl(null)
    })

    
  }

  // Note mark 
  onMark(id){
    if(this.form.value){
      //setting  Note as  completed
      this.noteService.markAsDone(id,this.form.value.done);
      //reset form
      this.form.patchValue({'done':null});
    }
  }
  
  //temporary deleting Note
  onDelete(id:number){
    if(confirm("do you want to delete this")){
      //calling delete Note function
      this.noteService.deleteNote(id)
    }else{
      return
    }
  }

  onEdit(id:number){
    this.noteService.editNote(id)
  }

 // unSubscribing subscription  
  ngOnDestroy() {
    this.noteSubscription.unsubscribe();
  }

}