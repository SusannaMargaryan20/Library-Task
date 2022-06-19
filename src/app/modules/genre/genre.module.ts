import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { GenreRoutingModule } from './genre-routing.module';
import { GenreMainComponent } from './genre-main/genre-main.component';
import {GlobalModule} from "../../platform/global/global.module";
import {ManageGenreModalComponent} from "./components/manage-genre-modal/manage-genre-modal.component";
import {DeleteModalComponent} from "./components/delete-modal/delete-modal.component";
import {ReactiveFormsModule} from "@angular/forms";

@NgModule({
  declarations: [
    GenreMainComponent,
    ManageGenreModalComponent,
    DeleteModalComponent
  ],
    imports: [
        CommonModule,
        GenreRoutingModule,
        GlobalModule,
        ReactiveFormsModule
    ]
})
export class GenreModule { }
