import { Component, OnInit, Inject, OnChanges, SimpleChanges, Input } from '@angular/core';
import { DOCUMENT } from '@angular/common';
import { FormControl } from '@angular/forms';
import { Router, ActivatedRoute, ParamMap } from '@angular/router';

// rx
import { Observable } from 'rxjs/Observable';
import { Subject } from 'rxjs/Subject';
import { Subscription } from 'rxjs/Subscription'
import { of } from 'rxjs/observable/of';
import 'rxjs/add/operator/delay';
import 'rxjs/add/operator/catch';
import 'rxjs/add/operator/debounceTime';
import 'rxjs/add/operator/distinctUntilChanged';

// service
import { OpportunityService } from '../../../../services/opportunity.service.ts';
import { WindowRef } from '../../../../services/window.service.ts';

// interface
import { Params, SwichLable } from './common/opp.class.ts';

@Component({
  selector: 'all-opportunities',
  templateUrl: '/components/pc/app-ng4/opportunities/template.html',
  styleUrls: ['/components/pc/app-ng4/opportunities/all/style.less']
})



export class AllOpportunitiesComponent implements OnInit {

  constructor(
    @Inject(DOCUMENT) private document: any,
    private opportunityService: OpportunityService,
    private windowRef: WindowRef,
    private route: ActivatedRoute,
    private router: Router,
  ) {}

  window = this.windowRef.nativeWindow;
  user: any;
  pageNum: number;
  totalItems: number;
  totalPages: number;
  itemsPerPage: number;
  params: Params;
  swichLable: SwichLable;
  imgSrc: SwichLable;
  swichStatus: boolean;

  ngOnInit(): void {
    this.pageNum = 1;
    this.totalItems = 0;
    this.totalPages = 1;
    this.itemsPerPage = 20;
    this.params = {
      location: {
        name: '不限',
      },
      industry: {
        name: '不限',
        category: 'industry',
        id: 0,
      },
      keyword: '',
      pageNum: this.pageNum,
      itemsPerPage: this.itemsPerPage,
    };
    this.swichLable = {
      on: '弹幕开启',
      off: '弹幕已关闭',
    };
    this.imgSrc = {
      on: '/images/banner-intern-no-word.jpg',
      off: '/images/banner-intern-has-words.jpg',
    };
    this.window.keyword = '';

    this.activate();
  }

  activate(): void {
    if (sessionStorage.getItem('danmuSwich')) {
      this.swichStatus = sessionStorage.getItem('danmuSwich') === 'true';
    } else {
      this.swichStatus = true;
      // this.getOppCount();
    }
    // console.log(this.route.snapshot);
    // console.log(this.route.snapshot._routerState.url);
  }

  inputKeyword() {
    if (this.route.snapshot._routerState.url.indexOf('recommended')) {
      // $rootScope.searchOpportunityRecommended($rootScope.keyword);
    }
    if (this.route.snapshot._routerState.url.indexOf('all')) {
      // $rootScope.searchOpportunities($rootScope.keyword);
    }
  }

}
