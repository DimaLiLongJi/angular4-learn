// 依赖
import { Injectable } from '@angular/core';
import { Headers, Http } from '@angular/http';
import { WindowRef } from './window.service.ts';

// rx 数据流
import 'rxjs/add/operator/toPromise';
// import { Observable }     from 'rxjs/Observable';
// import 'rxjs/add/operator/map';

import { HttpParams, HttpClient } from '@angular/common/http';

@Injectable()

export class OpportunityService {

  private window = this.winRef.nativeWindow;
  private headers = new Headers({ 'Content-Type': 'application/json' });
  private API_BASE_URL = this.window.API_BASE_URL;

  constructor(
    private http: Http,
    private winRef: WindowRef,
  ) { }

  getOpportunityList(params: any): Promise<any> {
    return this.http.get(`${this.API_BASE_URL}/opportunities`, { params: params })
      // .map(response => sresponse.json()); // rx写法
      .toPromise() // promise写法
      .then(response => response.json())
      .catch(this.handleError);
  }
  getLocationList(params?: any): Promise<any> {
    return this.http.get(`${this.API_BASE_URL}/opportunities/location/list`, { params: params })
      // .map(response => response.json()); // rx写法
      .toPromise() // promise写法
      .then(response => {
        return response.json();
      })
      .catch(this.handleError);
  }

  getPrefOpportunityList(params: any): Promise<any> {
    return this.http.get(`${this.API_BASE_URL}/opportunities/customize`, { params: params })
      .toPromise()
      .then(response => response.json())
      .catch(this.handleError);
  }

  private handleError(error: any): Promise<any> {
    console.error('An error occurred', error); // for demo purposes only
    return Promise.reject(error.message || error);
  }
}
