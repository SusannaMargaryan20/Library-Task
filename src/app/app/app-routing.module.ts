import {Route, RouterModule} from '@angular/router';
import {NgModule} from "@angular/core";

export const routes: Route[] = [
  {
    path: '',
    loadChildren: () => import('../platform/global/workspace-public/workspace-public.module').then(m => m.WorkspacePublicModule)
  },
  {
    path: '**',
    pathMatch: 'full',
    redirectTo: ''
  }
];


@NgModule({
  imports: [RouterModule.forRoot(routes, {scrollPositionRestoration: 'enabled'})],
  exports: [RouterModule],
})
export class AppRoutingModule {
}
