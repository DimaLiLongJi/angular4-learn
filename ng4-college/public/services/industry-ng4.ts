import { Injectable } from '@angular/core';
import { Headers, Http } from '@angular/http';
import { WindowRef } from './windowService.ts';

import 'rxjs/add/operator/toPromise';

@Injectable()

export class IndustryService {
  constructor(
    private http: Http,
    private winRef: WindowRef,
  ) { }

  private window = this.winRef.nativeWindow;
  private headers = new Headers({ 'Content-Type': 'application/json' });
  private API_BASE_URL = this.window.API_BASE_URL;

  getList(params?: any): Promise<any> {
    return this.http.get(`${this.API_BASE_URL}/industries`, {params: params})
      .toPromise()
      .then(response => response.json())
      .catch(this.handleError);
  }

  private handleError(error: any): Promise<any> {
    console.error('An error occurred', error);
    return Promise.reject(error.message || error);
  }

}