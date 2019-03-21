import { Component, OnInit, Inject, DoCheck, SimpleChanges, OnChanges, Input } from '@angular/core';
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
import { OpportunityService } from '../../../../../services/opportunity.service';
import { UserService } from '../../../../../services/user.service';
import { WindowRef } from '../../../../../services/window.service';

// interface
import { Params, CustomizationInfo } from '../common/opp.class';

@Component({
  selector: 'pc-recommended',
  templateUrl: '/components/pc/app-ng4/opportunities/recommended/template.html',
  styleUrls: ['/components/pc/app-ng4/opportunities/recommended/style.less']
})



export class RecommendedOpportunitiesComponent implements OnInit {
  constructor(
    @Inject(DOCUMENT) private document: any,
    private opportunityService: OpportunityService,
    private userService: UserService,
    private windowRef: WindowRef,
    // params: Params,
  ) { }
  window = this.windowRef.nativeWindow;
  user: any;
  keyword: string;
  totalItems: number;
  totalPages: number;
  params: Params;
  oppRecommendedArray = [];
  customizationInfo: CustomizationInfo;
  animationDuration: number;
  // customizedStatus: string;
  // reloadDanmu: boolean;
  options = [];
  scrollTop: any;
  acceptPush: number;

  ngOnInit(): void {
    this.user = this.window.$USER;
    this.totalItems = 0;
    this.totalPages = 1;
    this.params = {
      keyword: this.window.keyword || '',
      pageNum: 1,
      itemsPerPage: 20,
    };
    this.customizationInfo = {
      industries: [],
      locations: [],
      positions: [],
      stages: [],
    };
    this.animationDuration = 0;
    this.window.customizedStatus = 'failure';
    this.window.reloadDanmu = false;
    this.scrollTop = null;

    // this.activate();
    this.getList(this.buildCondition());
  }

  // ngDoCheck() {
  //   console.log('this.params', this.params);
  // }
  //
  // ngOnChanges(changes: SimpleChanges) {
  //   // changes.prop contains the old and the new value...
  //   if (!this.user ||
  //       !this.customizationInfo.industries.length ||
  //       !this.customizationInfo.locations.length ||
  //       !this.customizationInfo.positions.length ||
  //       !this.customizationInfo.stages.length
  //   ) return;
  //   if (n.keyword !== o.keyword) {
  //     this.params.pageNum = 1;
  //   }
  //   this.getList(this.buildCondition());
  // }
  activate(): void {
    const paramsSession: string = sessionStorage.getItem('recommendOppParams');
    if (paramsSession) {
      this.params = JSON.parse(paramsSession);
      this.scrollTop = this.params.scrollTop;
      delete this.params.scrollTop;
      sessionStorage.removeItem('recommendOppParams');
    }
    if (this.params.keyword) {
      this.window.keyword = this.params.keyword;
    }
    if (this.user) {
      this.acceptPush = this.user.subscribe ? this.user.acceptPush : 0;
    }
    if (this.user) {
      this.checkUserCustomizationInfo();
    }
    // this.getOptionList();
    this.getList(this.params);
  }

  checkUserCustomizationInfo(type?: string): void {
    this.userService.getCustomization({
      userId: this.user.id,
    })
      .then((customizationInfo) => {
        if (customizationInfo.industries.length ||
          customizationInfo.locations.length ||
          customizationInfo.positions.length ||
          customizationInfo.stages.length
        ) {
          this.customizationInfo = {
            industries: customizationInfo.industries,
            locations: customizationInfo.locations,
            positions: customizationInfo.positions,
            stages: customizationInfo.stages,
          };
          this.window.customizedStatus = 'success';
          if (type === 'recustomize') {
            this.loadCustomizeData();
          }
          this.getList(this.buildCondition());
        }
      })
      .catch(error => console.error(error));
  }

  loadCustomizeData(): void {
    this.window.customizedStatus = 'loading';
    this.animationDuration = Math.floor(Math.random() * 5);
    this.animationDuration = this.animationDuration;
    if (this.animationDuration < 2) {
      this.loadCustomizeData();
    }
    const timer: any = setTimeout(() => {
      this.window.customizedStatus = 'success';
      this.window.reloadDanmu = true;
      clearTimeout(timer);
    }, this.animationDuration * 1000);
  }

  buildCondition(): Params {
    const params: Params = Object.assign({}, this.params);
    let key: any;
    for (key in params) {
      if (!params[key]) {
        delete params[key];
      }
    }
    params.type = 1;
    return params;
  }

  getList(params: Params): void {
    console.log('params', params)
    this.opportunityService.getPrefOpportunityList(params)
      .then((result) => {
        this.oppRecommendedArray = result.opps;
        this.totalItems = result.totalItems;
        this.totalPages = Math.ceil(this.totalItems / this.params.itemsPerPage);
        this.scrollTo();
        console.log(result);
      })
      .catch(error => console.error(error));
  }

  scrollTo() {
    // if (!this.scrollTop) return;
    // $document.scrollTopAnimated(this.scrollTop, 500)
    // .then(() => {
    //   this.scrollTop = null;
    // });
    console.log('我是scrollTo')
  }

  // getOptionList(): void {
  //   Promise.all([
  //     this.opportunityService.getIndustryStatistics({
  //       type: 0,
  //     }),
  //     this.professionService.getList(),
  //     this.tagService.getTagList('college_qa_type')
  //   ])
  //   .then((result) => {
  //     console.log('result==', result);
  //     const goOnCustomize = localStorage.getItem('customize');
  //     this.options = result;
  //     if (goOnCustomize && this.user && !this.user.isPreferenced) {
  //       openCustomizeModal();
  //     }
  //     localStorage.removeItem('customize');
  //   })
  //   .catch(error => console.error(error));
  // }

}
