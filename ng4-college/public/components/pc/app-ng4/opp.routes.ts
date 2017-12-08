import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Routes, RouterModule } from '@angular/router';

import { OpportunitiesComponent } from '../../../components/pc/app-ng4/opportunities/opportunities.component.ts';

const routes: Routes = [
  {
    path: '',
    children: [
      {
        path: '',
        redirectTo: 'opportunities',
        pathMatch: 'prefix'
      },
      {
        path: 'opportunities',
        component: OpportunitiesComponent
      },
    ]
  }
];

@NgModule({
  imports: [
    RouterModule.forChild(routes)
  ],
  exports: [RouterModule],
})
export class OppRoutesModule {}
