import { Component, Input, OnInit, Output, EventEmitter } from '@angular/core';

import { WindowRef } from '../../services/window.service.ts';
import { IndustryService } from '../../services/industry.service.ts';

import { Industry } from './industry.class.ts';

@Component({
  selector: 'industry-selector',
  templateUrl: '/gadgets/industry-selector-ng4/template.html',
  styleUrls: ['/gadgets/industry-selector-ng4/style.less']
})

export class IndustrySelectorComponent implements OnInit {

  constructor(
    private industryService: IndustryService,
    private windowRef: WindowRef,
  ) { }

  moreIndustry: boolean;
  industryArray: [Industry];

  @Input()
  set industry(industry: Industry) {
    this.change.emit(industry);
  };

  @Output() change = new EventEmitter();

  ngOnInit(): void {
    this.moreIndustry = false;
    this.industry = this.industry ||
    {
      name: '不限',
      category: 'industry',
      id: 0,
    };
    this.getIndustryList();
  }

  toggleMoreIndustry() {
    this.moreIndustry = !this.moreIndustry;
  }

  selectIndustry(industry: Industry) {
    console.log('industry');
    this.industry = industry;
  }

  getIndustryList() {
    this.industryService.getList()
    .then((result) => {
      console.log('resule', result);
      this.industryArray = result;
      this.industryArray.unshift({
        name: '不限',
        category: 'industry',
        id: 0,
      });
    })
    .catch((error) => {
      console.error(error);
    });
  }
}
