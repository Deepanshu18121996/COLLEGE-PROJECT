import { BrowserModule } from "@angular/platform-browser";
import { NgModule } from "@angular/core";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { HttpClientModule } from "@angular/common/http";
import { AppRoutingModule } from "./app-routing.module";
import { AppComponent } from "./app.component";
import { LoginComponent } from "./pages/login/login.component";
import { AdminpanelComponent } from "./pages/adminpanel/adminpanel.component";
import { MainComponent } from "./pages/main/main.component";
import { DefaultComponent } from "./pages/default/default.component";
import { UserComponent } from "./pages/user/user.component";
import { SellRequestComponent } from "./pages/sell-request/sell-request.component";
import { OrderComponent } from "./pages/order/order.component";
import { NewBooksComponent } from "./pages/new-books/new-books.component";
import { OldBooksComponent } from "./pages/old-books/old-books.component";
import { RequestBooksComponent } from "./pages/request-books/request-books.component";
import { CalenderComponent } from "./pages/calender/calender.component";
import { EventComponent } from "./pages/event/event.component";
import { NotesComponent } from "./pages/notes/notes.component";
import { EditnotesComponent } from './pages/editnotes/editnotes.component';
import { NewNotesComponent } from './pages/new-notes/new-notes.component';

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    AdminpanelComponent,
    MainComponent,
    DefaultComponent,
    UserComponent,
    SellRequestComponent,
    OrderComponent,
    NewBooksComponent,
    OldBooksComponent,
    RequestBooksComponent,
    CalenderComponent,
    EventComponent,
    NotesComponent,
    EditnotesComponent,
    NewNotesComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
  ],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule { }
