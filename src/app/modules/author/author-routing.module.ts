import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {AuthorMainComponent} from "./author-main/author-main.component";

const routes: Routes = [
  {
    path: '',
    component: AuthorMainComponent
  },
  {
    path: '**',
    pathMatch: 'full',
    redirectTo: ''
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AuthorRoutingModule { }
