import { NgModule } from "@angular/core";
import { Routes, RouterModule } from "@angular/router";
import { LoginComponent } from "./pages/login/login.component";
import { AdminpanelComponent } from "./pages/adminpanel/adminpanel.component";
import { MainComponent } from "./pages/main/main.component";
import { UserComponent } from "./pages/user/user.component";
import { SellRequestComponent } from "./pages/sell-request/sell-request.component";
import { OrderComponent } from "./pages/order/order.component";
import { NewBooksComponent } from "./pages/new-books/new-books.component";
import { OldBooksComponent } from "./pages/old-books/old-books.component";
import { RequestBooksComponent } from "./pages/request-books/request-books.component";
import { CalenderComponent } from "./pages/calender/calender.component";
import { EventComponent } from "./pages/event/event.component";
import { NotesComponent } from "./pages/notes/notes.component";
import { DefaultComponent } from "./pages/default/default.component";
import { EditnotesComponent } from "./pages/editnotes/editnotes.component";
import { NewNotesComponent } from "./pages/new-notes/new-notes.component";
const routes: Routes = [
  { path: "", component: LoginComponent },
  {
    path: "main",
    component: MainComponent,
    children: [
      { path: "", component: AdminpanelComponent },
      { path: "user", component: UserComponent },
      { path: "sell_request", component: SellRequestComponent },
      { path: "order", component: OrderComponent },
      { path: "newbook", component: NewBooksComponent },
      { path: "oldbook", component: OldBooksComponent },
      { path: "requestbook", component: RequestBooksComponent },
      { path: "calender", component: CalenderComponent },
      { path: "event", component: EventComponent },
      { path: "notes", component: NotesComponent },
      { path: "de", component: DefaultComponent },
      { path: "editnote/:cid", component: EditnotesComponent },
      { path: "newnotes", component: NewNotesComponent },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
