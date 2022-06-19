import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AuthorRoutingModule } from './author-routing.module';
import { AuthorMainComponent } from './author-main/author-main.component';
import {MatTableModule} from "@angular/material/table";
import {MatSortModule} from "@angular/material/sort";
import {MatSlideToggleModule} from "@angular/material/slide-toggle";
import {GlobalModule} from "../../platform/global/global.module";
import {ManageAuthorModalComponent} from "./components/manage-author-modal/manage-author-modal.component";
import {DeleteModalComponent} from "./components/delete-modal/delete-modal.component";
import {ReactiveFormsModule} from "@angular/forms";
import {CalendarModule} from "primeng/calendar";
import {MatDatepicker, MatDatepickerModule} from "@angular/material/datepicker";
import {MatInputModule} from "@angular/material/input";
import {MatNativeDateModule} from "@angular/material/core";


@NgModule({
    declarations: [
        AuthorMainComponent,
        ManageAuthorModalComponent,
        DeleteModalComponent
    ],
    exports: [
        ManageAuthorModalComponent
    ],
  imports: [
    CommonModule,
    AuthorRoutingModule,
    MatTableModule,
    MatSortModule,
    MatSlideToggleModule,
    GlobalModule,
    ReactiveFormsModule,
    CalendarModule,
    MatDatepickerModule,
    MatInputModule,
    MatNativeDateModule
  ]
})
export class AuthorModule { }
