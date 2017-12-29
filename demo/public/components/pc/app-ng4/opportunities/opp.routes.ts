import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Routes, RouterModule } from '@angular/router';

// import { OpportunitiesComponent } from '../../../../components/pc/app-ng4/opportunities/all/opportunities.component.ts';
import { OpportunitiesComponent } from './all/opportunities.component.ts';

const routes: Routes = [
  {
    path: '',
    children: [
      {
        path: '',
        redirectTo: 'all',
        pathMatch: 'prefix'
      },
      {
        path: 'all',
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
