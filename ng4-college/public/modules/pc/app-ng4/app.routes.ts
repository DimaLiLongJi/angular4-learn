import { NgModule } from '@angular/core';
import { RouterModule, Routes, ExtraOptions } from '@angular/router';

const routes: Routes = [
  {
    path: '',
    redirectTo: 'opp',
    pathMatch: 'full'
  },
  {
    path: 'opp',
    loadChildren: '../../../components/pc/app-ng4/opp.module.ts#OppModule'
  },
  { path: '**', pathMatch: 'full', redirectTo: '' }
];

const config: ExtraOptions = { // 使用hash 避免刷新消失
    useHash: true,
};

@NgModule({
  imports: [RouterModule.forRoot(routes, config)], // 添加forRoot
  exports: [RouterModule]
})

export class AppRoutingModule {};
