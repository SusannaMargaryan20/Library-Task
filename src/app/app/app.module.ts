import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { MainComponent } from './main-component/main.component';
import {BrowserAnimationsModule} from "@angular/platform-browser/animations";
import {AppRoutingModule} from "./app-routing.module";
import {GlobalModule} from "../platform/global/global.module";
import {WorkspacePublicModule} from "../platform/global/workspace-public/workspace-public.module";

@NgModule({
  declarations: [
    MainComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    AppRoutingModule,
    GlobalModule,
    WorkspacePublicModule
  ],
  providers: [],
  bootstrap: [MainComponent]
})
export class AppModule { }
