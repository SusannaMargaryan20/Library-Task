import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {GenreMainComponent} from "./genre-main/genre-main.component";

const routes: Routes = [
  {
    path: '',
    component: GenreMainComponent,
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class GenreRoutingModule { }
