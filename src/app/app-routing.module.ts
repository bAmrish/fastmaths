import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {SolverComponent} from './paper/components/solver/solver.component';
import {PaperConfigComponent} from './paper/components/config/config.component';
import {NewPaperComponent} from './paper/components/new/new.component';
import {NotFoundComponent} from './NotFoundComponent/not-found.component';

const routes: Routes = [
  {
    path: 'paper',
    children: [
      {
        path: '',
        redirectTo: 'config/new',
        pathMatch: 'full'
      },
      {
        path: 'new',
        component: NewPaperComponent
      },
      {
        path: ':id/solve',
        component: SolverComponent
      },
      {
        path: 'config',
        children: [
          {
            path: ':id',
            component: PaperConfigComponent
          },
          {
            path: '',
            redirectTo: 'new',
            pathMatch: 'full',
          }
        ]
      },
    ]
  },
  {
    path: '',
    redirectTo: 'paper/config/new',
    pathMatch: 'full'
  },
  {
    path: '**',
    component: NotFoundComponent
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {
}
