// 依赖
import { NgModule } from '@angular/core';
import { HttpModule } from '@angular/http';
import { FormsModule }    from '@angular/forms';  // input
import { CommonModule } from '@angular/common';
// module
import { OppRoutesModule } from './opp.routes.ts';
import { GadgetsModule } from "../../../../gadgets/gadgets.module.ts";

// component
import { OpportunitiesComponent } from './all/opportunities.component.ts';
// import { LocationSelectorComponent } from '../../../gadgets/location-selector-ng4/location-selector.component.ts';


@NgModule({
  imports: [
    CommonModule,
    OppRoutesModule,
    HttpModule,
    GadgetsModule,
  ],
  declarations: [
    OpportunitiesComponent,
    // LocationSelectorComponent,
  ],
  exports: [
    // OpportunitiesComponent,
    // LocationSelectorComponent,
  ]
})
export class OppModule { }
