import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';

import {BooksRoutingModule} from './books-routing.module';
import {BooksComponent} from './books-main/books.component';
import {GlobalModule} from "../../platform/global/global.module";
import { ManageBookModalComponent } from './components/manage-book-modal/manage-book-modal.component';
import {ReactiveFormsModule} from "@angular/forms";
import {DeleteModalComponent} from "./components/delete-modal/delete-modal.component";


@NgModule({
    declarations: [
        BooksComponent,
        ManageBookModalComponent,
        DeleteModalComponent
    ],
    exports: [
        ManageBookModalComponent
    ],
    imports: [
        CommonModule,
        GlobalModule,
        BooksRoutingModule,
        ReactiveFormsModule,
    ],
  providers: [
  ]
})
export class BooksModule {
}
