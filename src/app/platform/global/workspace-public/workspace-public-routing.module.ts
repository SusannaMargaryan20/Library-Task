import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {MainComponent} from "./main-component/main.component";

const routes: Routes = [
  {
    path: '',
    component: MainComponent,
    children: [
      {
        path: 'genre',
        loadChildren: () => import('../../../modules/genre/genre.module').then(m => m.GenreModule),
      },
      {
        path: 'books',
        loadChildren: () => import('../../../modules/books/books.module').then(m => m.BooksModule),
      },
      {
        path: 'author',
        loadChildren: () => import('../../../modules/author/author.module').then(m => m.AuthorModule),
      },
      {
        path: '**',
        pathMatch: 'full',
        redirectTo: 'genre',
      },
    ]
  },
  {
    path: '**',
    pathMatch: 'full',
    redirectTo: '',
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class WorkspacePublicRoutingModule { }
