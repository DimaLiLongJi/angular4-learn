webpackJsonp([0],{

/***/ 569:
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
// 依赖
// import { BrowserModule } from '@angular/platform-browser';
var core_1 = __webpack_require__(178);
var http_1 = __webpack_require__(272);
// module
var opp_routes_ts_1 = __webpack_require__(622);
// component
var opportunities_component_ts_1 = __webpack_require__(581);
// import { LocationSelectorComponent } from '../../../gadgets/location-selector-ng4/location-selector.component.ts';
var OppModule = /** @class */ (function () {
    function OppModule() {
    }
    OppModule = __decorate([
        core_1.NgModule({
            imports: [
                opp_routes_ts_1.OppRoutesModule,
                http_1.HttpModule,
            ],
            declarations: [
                opportunities_component_ts_1.OpportunitiesComponent,
            ]
        })
    ], OppModule);
    return OppModule;
}());
exports.OppModule = OppModule;


/***/ }),

/***/ 622:
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
var core_1 = __webpack_require__(178);
var router_1 = __webpack_require__(340);
var opportunities_component_ts_1 = __webpack_require__(581);
var routes = [
    {
        path: '',
        children: [
            {
                path: '',
                redirectTo: 'opportunities',
            },
            {
                path: 'opportunities',
                component: opportunities_component_ts_1.OpportunitiesComponent
            },
        ]
    }
];
var OppRoutesModule = /** @class */ (function () {
    function OppRoutesModule() {
    }
    OppRoutesModule = __decorate([
        core_1.NgModule({
            imports: [
                router_1.RouterModule.forChild(routes)
            ],
            exports: [router_1.RouterModule],
        })
    ], OppRoutesModule);
    return OppRoutesModule;
}());
exports.OppRoutesModule = OppRoutesModule;


/***/ })

});