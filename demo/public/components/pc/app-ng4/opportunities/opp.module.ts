// 依赖
import { NgModule } from '@angular/core';
import { HttpModule } from '@angular/http';
import { FormsModule }    from '@angular/forms';  // input
import { CommonModule } from '@angular/common';
// module
import { OppRoutesModule } from './opp.routes.ts';
import { GadgetsModule } from "../../../../gadgets/gadgets.module.ts";

// component
import { AllOpportunitiesComponent } from './opp.component.ts';
import { OpportunitiesComponent } from './all/opportunities.component.ts';
import { RecommendedOpportunitiesComponent } from "./recommended/recommended.components.ts";
// import { LocationSelectorComponent } from '../../../gadgets/location-selector-ng4/location-selector.component.ts';


@NgModule({
  imports: [
    CommonModule,
    OppRoutesModule,
    HttpModule,
    GadgetsModule,
  ],
  declarations: [
    AllOpportunitiesComponent,
    OpportunitiesComponent,
    RecommendedOpportunitiesComponent,
    // LocationSelectorComponent,
  ],
  exports: [
    // OpportunitiesComponent,
    // LocationSelectorComponent,
  ],
  // bootstrap: [ // 启动模块的component
  //   AllOpportunitiesComponent,
  // ],
})
export class OppModule { }
