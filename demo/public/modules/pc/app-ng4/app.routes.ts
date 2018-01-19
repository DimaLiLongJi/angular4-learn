import { NgModule } from '@angular/core';
import { RouterModule, Routes, ExtraOptions } from '@angular/router';

const routes: Routes = [
  {
    path: '',
    redirectTo: 'opportunities',
    pathMatch: 'full'
  },
  {
    path: 'opportunities',
    loadChildren: '../../../components/pc/app-ng4/opportunities/opp.module.ts#OppModule'
  },
  {
    path: '**',
    pathMatch: 'full',
    redirectTo: 'opportunities'
  }
];

const config: ExtraOptions = { // 使用hash 避免刷新消失
  useHash: true,
};

@NgModule({
  imports: [RouterModule.forRoot(routes, config)], // 添加forRoot
  exports: [RouterModule]
})

export class AppRoutingModule { };
