import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Routes, RouterModule } from '@angular/router';

// import { OpportunitiesComponent } from '../../../../components/pc/app-ng4/opportunities/all/opportunities.component.ts';
import { AllOpportunitiesComponent } from './opp.component.ts';
import { OpportunitiesComponent } from './all/opportunities.component.ts';
import { RecommendedOpportunitiesComponent } from './recommended/recommended.components.ts';

const routes: Routes = [
  {
    path: '',
    component: AllOpportunitiesComponent, // 如果不需要可以不加
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
      {
        path: 'recommended',
        component: RecommendedOpportunitiesComponent
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
export class OppRoutesModule { }
