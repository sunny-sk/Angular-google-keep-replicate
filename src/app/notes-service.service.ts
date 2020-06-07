import { note } from './model/note.model';
import { Injectable, OnInit } from '@angular/core';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class NotesService{
  
  
   notes :note[] = []  
   trashNotes :note[] = []
  
  //Subjects for sending update about Notes to the various components
  private notesUpdated = new Subject<note[]>();
  private trashUpdated = new Subject<note[]>();
  private singleNoteUpdate = new Subject<note>()
   

  getPostUpdateListener() {
    return this.notesUpdated.asObservable();
  }
  getTrashUpdateListener() {
    return this.trashUpdated.asObservable();
  }
  
  getSingleNoteUpdateListenr(){
    return this.singleNoteUpdate.asObservable();
  }

  // fetch all trashed  Notes from localstorage
  getAllTrash(){
    this.notes = JSON.parse(localStorage.getItem('trashNotes'))
    return [...this.notes];
  }

  // fetch all notes from localstorage
  getAllNotes(){
    this.trashNotes = JSON.parse(localStorage.getItem('notes'))
    this.notes = [...this.trashNotes]
    return [...this.trashNotes];
  }
   
  // create new note
  setNewNote(title: string, note: string) {
     let newId = JSON.parse(localStorage.getItem('trashNotes')).length + JSON.parse(localStorage.getItem('notes')).length
     const oldNotes = [...JSON.parse(localStorage.getItem('notes'))]; 
     oldNotes.push({id:newId+1,title,note,date:new Date(),done:false});
    this.notes = oldNotes;
    localStorage.setItem('notes',JSON.stringify(this.notes));
    this.notesUpdated.next([...this.notes]);  
  }

  setUpdateSingleNote(id:number,title:string,note:string){
    const notes = [...this.notes]
    notes.forEach((el,index) => {
      if(el.id === id){
        el.title = title;
        el.note = note
      }
    }
    )
    this.notes = [...notes];
    localStorage.setItem('notes',JSON.stringify(this.notes));
    this.notesUpdated.next([...this.notes]);  
  }

  
  //temporary  delete Note
  deleteNote(deleteId: number) {
    let trashUpdatedNote = JSON.parse(localStorage.getItem('trashNotes'));
    this.notes = JSON.parse(localStorage.getItem('notes'));
    let updatedNote = this.notes.filter((note) => {
      if(note.id !== deleteId){
        return note;
      }else{
          trashUpdatedNote.push(note);
          return;
      }
    });
      this.notes = updatedNote;
      this.trashNotes = trashUpdatedNote;
      localStorage.setItem('notes',JSON.stringify(this.notes));
      localStorage.setItem('trashNotes',JSON.stringify(this.trashNotes));
      this.notesUpdated.next([...this.notes]);
      this.trashUpdated.next([...this.trashNotes]);
  }


   // restore  deleted notes
    restoreNoteFromTrash(restoreId:number){
      let updatedNote = JSON.parse(localStorage.getItem('notes'));
      this.trashNotes = JSON.parse(localStorage.getItem('trashNotes'));
      let trashUpdatedNote = this.trashNotes.filter((trash) => {
        if(trash.id !== restoreId){
          return trash;
        }else{
          updatedNote.push(trash);
            return;
        }
      });
      this.notes = updatedNote;
      this.trashNotes = trashUpdatedNote;
      localStorage.setItem('notes',JSON.stringify(this.notes));
      localStorage.setItem('trashNotes',JSON.stringify(this.trashNotes));
      this.notesUpdated.next([...this.notes]);
      this.trashUpdated.next([...this.trashNotes]);
    }
  
     // mark as done to a note
     markAsDone(id:number,markResult:boolean){
      const oldNotes = JSON.parse(localStorage.getItem('notes'));
       
          for(let i=0;i<oldNotes.length;i++){
            if(oldNotes[i].id === id){
              oldNotes[i].done = markResult;
              break; 
           }
          }
      
       this.notes = oldNotes;
       localStorage.setItem('notes',JSON.stringify(this.notes));
       this.notesUpdated.next([...this.notes]);
     }

    //permanent delete note from trash
    permanentDelete(id: number) {
      this.trashNotes = JSON.parse(localStorage.getItem('trashNotes'));
      let trashUpdatedNote = this.trashNotes.filter(trash => trash.id !== id);
      this.trashNotes = trashUpdatedNote;
      localStorage.setItem('trashNotes',JSON.stringify(this.trashNotes));
      this.trashUpdated.next([...this.trashNotes]);
    }


    editNote(id:number){
      this.notes.forEach(note =>{
      if(note.id === id){
        this.singleNoteUpdate.next({...note});
      }
      })
      // console.log(this.notes[id-1])
    }

  }
  
