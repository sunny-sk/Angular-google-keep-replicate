
import { Component, OnInit, OnDestroy } from '@angular/core';
import { Subscription } from 'rxjs/internal/Subscription';
import { note } from '../model/note.model';
import { NotesService } from '../notes-service.service';


@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit, OnDestroy{

 
  
  private trashSubscription: Subscription;
  trashs: note[] = []
  showSideBar:boolean = false;
  showSidebarButtonDisplay: boolean  = true;
  notifyLength:number ;

  
  constructor(private noteService: NotesService) { }

   

  ngOnInit(){
    // fetching trash notes
    this.trashs = this.noteService.getAllTrash();
    this.notifyLength  = this.trashs.length;
    // getting update for trash notes
    this.trashSubscription = this.noteService.getTrashUpdateListener().subscribe(trashNotes => {
      this.trashs = trashNotes;
      this.notifyLength = this.trashs.length;
    })
  }
  
  

  //sideBar functionality
  onShowSideBar(){
   this.showSideBar = true;
   this.showSidebarButtonDisplay = false;
  
 }
 onHideSideBar(){
   this.showSideBar = false;
   this.showSidebarButtonDisplay = true;
  
  }
  onAnyWhereClick(){
   this.onHideSideBar();
  }

  // unsubscribing the subscription
  ngOnDestroy(){
    this.trashSubscription.unsubscribe();
  }

  
}
