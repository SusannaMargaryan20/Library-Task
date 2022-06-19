import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { WorkspacePublicRoutingModule } from './workspace-public-routing.module';
import {GlobalModule} from "../global.module";
import {HeaderComponentComponent} from "./components/header-component/header-component.component";
import {MainComponent} from "./main-component/main.component";


@NgModule({
  declarations: [
    MainComponent,
    HeaderComponentComponent
  ],
  imports: [
    CommonModule,
    GlobalModule,
    WorkspacePublicRoutingModule,
  ]
})
export class WorkspacePublicModule { }
