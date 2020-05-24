import { NgModule } from "@angular/core";
import { Routes, RouterModule } from "@angular/router";
import { MainComponent } from "./pages/main/main.component";
import { LoginComponent } from "./pages/login/login.component";
import { HomeComponent } from "./pages/home/home.component";
import { ContactComponent } from "./pages/contact/contact.component";
import { NotesComponent } from "./pages/notes/notes.component";
import { WishlistComponent } from "./pages/wishlist/wishlist.component";
import { BooksComponent } from "./pages/books/books.component";
import { MyaccComponent } from "./pages/myacc/myacc.component";
import { ProfileComponent } from "./pages/profile/profile.component";
import { OrderComponent } from "./pages/order/order.component";
import { CartComponent } from "./pages/cart/cart.component";
import { CheckoutComponent } from "./pages/checkout/checkout.component";
import { SellComponent } from "./pages/sell/sell.component";
import { NotesreqComponent } from "./pages/notesreq/notesreq.component";
import { LoginguardGuard } from "./guard/loginguard.guard";
import { BooksreqComponent } from "./pages/booksreq/booksreq.component";
import { SecondbooksComponent } from "./pages/secondbooks/secondbooks.component";
import { EditprofileComponent } from "./pages/editprofile/editprofile.component";
import { SellOrderComponent } from "./pages/sell-order/sell-order.component";
import { AboutComponent } from "./pages/about/about.component";

const routes: Routes = [
  { path: "", component: MainComponent },
  { path: "about", component: AboutComponent },
  { path: "login", component: LoginComponent },
  { path: "cart", component: CartComponent, canActivate: [LoginguardGuard] },
  {
    path: "checkout",
    component: CheckoutComponent,
    canActivate: [LoginguardGuard],
  },
  { path: "home", component: MainComponent },

  {
    path: "contact",
    component: ContactComponent,
    canActivate: [LoginguardGuard],
  },
  { path: "notes", component: NotesComponent },
  {
    path: "wishlist",
    component: WishlistComponent,
    canActivate: [LoginguardGuard],
  },

  { path: "books", component: BooksComponent },
  { path: "notes", component: NotesComponent },
  { path: "second", component: SecondbooksComponent },
  {
    path: "myacc",
    component: MyaccComponent,
    canActivate: [LoginguardGuard],
    children: [
      { path: "", component: ProfileComponent },
      { path: "order", component: OrderComponent },

      { path: "editprofile", component: EditprofileComponent },
      { path: "sell_order", component: SellOrderComponent },
      { path: "sell", component: SellComponent },

      { path: "notesreq", component: NotesreqComponent },
      { path: "bookreq", component: BooksreqComponent },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
