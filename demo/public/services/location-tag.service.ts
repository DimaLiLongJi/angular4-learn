import { Injectable } from '@angular/core';
import { Headers, Http } from '@angular/http';
import { WindowRef } from './window.service.ts';

import 'rxjs/add/operator/toPromise';

@Injectable()

export class LocationTagService {
  constructor(
    private http: Http,
    private winRef: WindowRef,
  ) { }

  private window = this.winRef.nativeWindow;
  private headers = new Headers({ 'Content-Type': 'application/json' });
  private API_BASE_URL = this.window.API_BASE_URL;

  getLocationTagList(): Promise<any> {
    return this.http.get(`${this.API_BASE_URL}/location_tags`)
      .toPromise()
      .then(response => response.json())
      .catch(this.handleError);
  }

  private handleError(error: any): Promise<any> {
    console.error('An error occurred', error);
    return Promise.reject(error.message || error);
  }

}
