import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {MatToolbarModule} from "@angular/material/toolbar";
import {MatButtonModule} from "@angular/material/button";
import {MatIconModule} from "@angular/material/icon";
import {MatSidenavModule} from "@angular/material/sidenav";
import {MatListModule} from "@angular/material/list";
import {RouterModule} from "@angular/router";
import {HttpClientModule} from "@angular/common/http";
import {MatPaginatorModule} from "@angular/material/paginator";
import {MatDialogModule} from "@angular/material/dialog";
import {TruncatePipe} from "../pipes/truncate.pipe";
import {ModalComponent} from "../components/modal/modal.component";
import {BgImageDirective} from "../directives/bg-image.directive";
import {MatFormFieldModule} from "@angular/material/form-field";
import {MatSelectModule} from "@angular/material/select";

const MAT_MODULES = [
  MatToolbarModule,
  MatButtonModule,
  MatIconModule,
  MatSidenavModule,
  MatListModule,
  MatPaginatorModule,
  MatDialogModule,
  MatFormFieldModule,
  MatSelectModule,
];


@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    RouterModule,
    ReactiveFormsModule,
    HttpClientModule,
    ...MAT_MODULES,
  ],
  exports: [
    CommonModule,
    FormsModule,
    RouterModule,
    HttpClientModule,
    TruncatePipe,
    BgImageDirective,
    ModalComponent,
    ...MAT_MODULES,
  ],
  declarations: [
    TruncatePipe,
    BgImageDirective,
    ModalComponent,
  ],
  providers: []
})
export class GlobalModule {
}
