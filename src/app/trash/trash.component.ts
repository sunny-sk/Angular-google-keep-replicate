import { Component, OnInit, OnDestroy } from '@angular/core';
import { note } from '../model/note.model';
import { Subscription } from 'rxjs';
import { NotesService } from '../notes-service.service';

@Component({
  selector: 'app-trash',
  templateUrl: './trash.component.html',
  styleUrls: ['./trash.component.css']
})
export class TrashComponent implements OnInit, OnDestroy {

  trashs: note[] = []
  private trashSubscription: Subscription;

  //adding dependency of NoteService Service
  constructor(private noteService: NotesService) { }


  ngOnInit() {
    //fetching trash Notes
    this.trashs = this.noteService.getAllTrash();
    // checking updates for trashed Notes
    this.trashSubscription = this.noteService.getTrashUpdateListener().subscribe(trashNotes => {
      this.trashs = trashNotes;
    })
  }

  // restoring temporary deleted Notes
  onRestore(id: number) {
    this.noteService.restoreNoteFromTrash(id);
    return
  }

  // permanent deleting Notes
  onPermanantDelete(id: number) {
    if (confirm("are you sure")) {
      this.noteService.permanentDelete(id);
      return;
    }
    return
  }

  //unSubscribing the subscription
  ngOnDestroy() {
    this.trashSubscription.unsubscribe();
  }


}
