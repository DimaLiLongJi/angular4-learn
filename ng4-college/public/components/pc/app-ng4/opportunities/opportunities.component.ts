import { Component, OnInit, Inject, OnChanges, SimpleChanges, Input } from '@angular/core';
import { DOCUMENT } from '@angular/common';
import { FormControl } from '@angular/forms';

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
import { OpportunityService } from '../../../../services/opportunity-ng4.ts';
import { WindowRef } from '../../../../services/windowService.ts';

// interface
import { Params } from './opportunities.class.ts';

@Component({
  selector: 'pc-opportunities',
  templateUrl: '/components/pc/app-ng4/opportunities/template.html',
  styleUrls: ['/components/pc/app-ng4/opportunities/style.less']
})



export class OpportunitiesComponent implements OnInit {

  constructor(
    @Inject(DOCUMENT) private document: any,
    private opportunityService: OpportunityService,
    private windowRef: WindowRef,
    // params: Params,
  ) {}

  totalItems: number;
  totalPages: number;
  params: Params;
  scrollTop: number;
  paramsOb: Subscription;
  swichStatus: boolean;
  oppArray = [];
  window = this.windowRef.nativeWindow;
  paramsObv: any;
  // listParams: Params;
  // @Input()
  // set params(value: Params) {
  //   this.listParams = value;
  //   this.getList(this.buildCondition());
  //   console.log('params1', value);
  // }
  //
  // get params(): Params {
  //   console.log('params2', this.listParams);
  //   // this.getList(this.buildCondition());
  //   // console.log('params', this.params);
  //   return this.listParams;
  // }


  // private listTerms = new Subject<string>();

  ngOnInit(): void {
    this.totalItems = 0;
    this.totalPages = 1;
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
      pageNum: 1,
      itemsPerPage: 20,
    };
    this.scrollTop = 0;


    // setTimeout(() => {
    //   this.params.keyword = 'xxx';
    //   console.log(2, this.params);
    // }, 2000);
    this.paramsObv = of(this.params);
    this.activate();
    this.paramsObv.subscribe((data) => {
      console.log('dataValue', data.value);
      // this.params = data.value;
      // this.getList(this.buildCondition());
    })
  }

  activate(): void {
    const paramsSession: string = sessionStorage.getItem('allOppParams');

    if (sessionStorage.getItem('danmuSwich')) {
      this.swichStatus = sessionStorage.getItem('danmuSwich') === 'true';
    } else {
      this.swichStatus = true;
    }

    if (paramsSession) {
      this.params = JSON.parse(paramsSession);
      this.scrollTop = this.params.scrollTop;
      delete this.params.scrollTop;
      sessionStorage.removeItem('allOppParams');
    }
    console.log(this.params);
    if (this.params.keyword) {
      // $rootScope.keyword = this.params.keyword;
      console.log(this.params.keyword);
    }
    this.getList(this.buildCondition());
  }

  saveStatus(): void {
    const params: Params = Object.assign({}, this.params);
    params.scrollTop = this.document.documentElement.scrollTop ||
      window.pageYOffset || this.document.body.scrollTop;

    sessionStorage.setItem('allOppParams', JSON.stringify(params));
  }

  search() {
    this.getList(this.buildCondition());
  }

  scrollTo() {
    console.log('this.scrollTop', this.scrollTop);
    if (!this.scrollTop) return;
    // $document.scrollTopAnimated(this.scrollTop, 500)
    // .then(() => {
    //   this.scrollTop = null;
    // });
  }

  buildCondition(): Params {
    let key: any;
    const params: Params = Object.assign({}, this.params);
    for (key in params) {
      if (!params[key]) {
        delete params[key];
      }
    }
    if (params.industry && params.industry.id) {
      params.industryId = params.industry.id;
      delete params.industry;
    }
    if (params.location && params.location.id) {
      params.locationId = params.location.id;
      delete params.location;
    }
    return params;
  }

  getList(params: Params): void {
    console.log(params)
    this.opportunityService.getOpportunityList(params)
      .then(result => {
        this.oppArray = result.opps.map((opp) => {
          if (/default/.test(opp.company.imageUrl)) {
            opp.company.imageUrl = '/images/default-logo.jpg';
          }
          return opp;
        });
        this.totalItems = result.totalItems;
        this.totalPages = Math.ceil(this.totalItems / this.params.itemsPerPage);
        this.scrollTo();
      });
  }

  openLoginModal(urlParams) {
    console.log('urlParams', urlParams);
    // const modalInstance = $uibModal.open({
    //   windowClass: 'small-modal login-modal',
    //   animation: true,
    //   backdrop: 'static',
    //   templateUrl: '/gadgets/wechat-login-modal/template.html',
    //   controller: 'wechatLoginCtrl',
    //   controllerAs: 'vm',
    //   resolve: {
    //     urlParams: () => urlParams,
    //   },
    // });
    //
    // modalInstance.result
    //   .then(() => {
    //   })
    //   .catch(() => {
    //   });
  }

  ngOnDestroy() {
    this.paramsOb.unsubscribe();
  }

  locationChange(event: any) {
    console.log(event);
    this.params.location = event;
    this.getList(this.buildCondition());
  }

  industryChange(event: any) {
    console.log(event);
    this.params.industry = event;
    this.getList(this.buildCondition());
  }
}
