// 依赖
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { RouterModule }   from '@angular/router';
import { HttpModule } from '@angular/http';
import { FormsModule }    from '@angular/forms';  // input

// module
import { AppRoutingModule } from './app.routes.ts';
import { OppModule } from '../../../components/pc/app-ng4/opp.module.ts';
import { GadgetsModule }  from "../../../gadgets/gadgets.module.ts";
// component
import { AppComponent } from './app.compontent.ts';
// import { OpportunitiesComponent } from '../../../components/pc/app-ng4/opportunities/opportunities.component.ts'
// import { LocationSelectorComponent } from '../../..//gadgets/location-selector-ng4/location-selector.component.ts'

// services
import { OpportunityService } from '../../../services/opportunity-ng4.ts';
import { LocationTagService } from '../../../services/location-tag-ng4.ts';
import { WindowRef } from '../../../services/windowService.ts';
import { IndustryService } from '../../../services/industry-ng4.ts'

@NgModule({
  declarations: [ // component
    AppComponent,
    // LocationSelectorComponent,
    // OpportunitiesComponent,
  ],
  imports: [ // module
    BrowserModule,
    AppRoutingModule,
    HttpModule,
    FormsModule,
    OppModule,
    GadgetsModule,
  ],
  exports: [
    // LocationSelectorComponent,
  ],
  providers: [ // service
    OpportunityService,
    LocationTagService,
    WindowRef,
    IndustryService,
  ],
  bootstrap: [ // 启动模块的component
    AppComponent,
  ],
})
export class AppModule { }
