// 依赖
import { NgModule } from '@angular/core';
import { RouterModule }   from '@angular/router';
import { HttpModule } from '@angular/http';
import { FormsModule }    from '@angular/forms';  // input
import { CommonModule } from '@angular/common';

// module

// component
import { LocationSelectorComponent } from './location-selector-ng4/location-selector.component.ts';
import { IndustrySelectorComponent } from './industry-selector-ng4/industry-selector.component.ts';

// services
// import { OpportunityService } from '../../../services/opportunity-ng4.ts';
// import { LocationTagService } from '../../../services/location-tag-ng4.ts';
// import { WindowRef } from '../../../services/windowService.ts';

@NgModule({
  declarations: [ // component
    LocationSelectorComponent,
    IndustrySelectorComponent,
  ],
  imports: [ // module
    CommonModule,
    HttpModule,
    FormsModule,
  ],
  exports: [
    LocationSelectorComponent,
    IndustrySelectorComponent,
  ],
  providers: [ // service
    // OpportunityService,
    // LocationTagService,
    // WindowRef,
  ],
})
export class GadgetsModule { }
