import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {BooksComponent} from "./books-main/books.component";

const routes: Routes = [
  {
    path: '',
    component: BooksComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class BooksRoutingModule { }
