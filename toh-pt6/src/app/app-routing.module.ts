import { NgModule }             from '@angular/core';
import { RouterModule, Routes, ExtraOptions } from '@angular/router';

import { DashboardComponent }   from './dashboard.component';
import { HeroesComponent }      from './heroes.component';
import { HeroDetailComponent }  from './hero-detail.component';

const routes: Routes = [
  { path: '', redirectTo: '/dashboard', pathMatch: 'full' },
  { path: 'dashboard',  component: DashboardComponent },
  { path: 'detail/:id', component: HeroDetailComponent },
  { path: 'heroes',     component: HeroesComponent }
];
const config: ExtraOptions = { // 使用hash 避免刷新消失
    useHash: true,
};
@NgModule({
  imports: [ RouterModule.forRoot(routes, config) ],
  exports: [ RouterModule ]
})
export class AppRoutingModule {}
