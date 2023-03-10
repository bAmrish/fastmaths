import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {SolverComponent} from './paper/components/solver/solver.component';
import {EditConfigComponent} from './paper/components/config/edit/edit.component';
import {NewPaperComponent} from './paper/components/new/new.component';
import {NotFoundComponent} from './NotFoundComponent/not-found.component';
import {ConfigsComponent} from './paper/components/config/configs.component';
import {PapersComponent} from './paper/components/papers.component';

const routes: Routes = [
  {
    path: 'paper',
    children: [
      {
        path: '',
        component: PapersComponent
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
            component: EditConfigComponent
          },
          {
            path: '',
            component: ConfigsComponent
          }
        ]
      },
    ]
  },
  {
    path: '',
    redirectTo: 'paper',
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
