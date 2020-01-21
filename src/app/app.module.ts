// modules
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NgModule } from '@angular/core';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {RouterModule, Routes} from '@angular/router';

//components
import { AppComponent } from './app.component';
import { NavbarComponent } from './navbar/navbar.component';
import { FooterComponent } from './footer/footer.component';
import { AuthComponent } from './auth/auth.component';
import { NoteCreateComponent } from './note-create/note-create.component';
import { TrashComponent } from './trash/trash.component';
import { FeedbackComponent } from './feedback/feedback.component';
import { NoteListComponent } from './note-list/note-list.component'


//routings
const routes : Routes = [
    {path :'', component :NoteListComponent },
    {path :'create-notes', component :NoteCreateComponent },
    {path :'auth', component :AuthComponent },
    {path :'trash', component : TrashComponent},
    {path :'feedback', component :FeedbackComponent },
    {path :'**', component:NoteListComponent},
]

@NgModule({
  declarations: [
    AppComponent,
    NavbarComponent,
    FooterComponent,
    AuthComponent,
    TrashComponent,
    FeedbackComponent,
    NoteListComponent,
    NoteCreateComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    FormsModule,
    ReactiveFormsModule,
    RouterModule.forRoot(routes)
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
