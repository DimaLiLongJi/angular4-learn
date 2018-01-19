import { Injectable } from '@angular/core';
import { Headers, Http } from '@angular/http';
import { WindowRef } from './window.service.ts';

import 'rxjs/add/operator/toPromise';

@Injectable()

export class UserService {
  constructor(
    private http: Http,
    private winRef: WindowRef,
  ) { }

  private window = this.winRef.nativeWindow;
  private headers = new Headers({ 'Content-Type': 'application/json' });
  private API_BASE_URL = this.window.API_BASE_URL;

  getCustomization(params: any): Promise<any> {
    return this.http.get(`${this.API_BASE_URL}/users/${params.id}`, { params: params })
      .toPromise()
      .then(response => response.json())
      .catch(this.handleError);
  }

  updateAcceptPush(acceptPush: any): Promise<any> {
    return this.http.put(`${this.API_BASE_URL}/users/accept_push`, { acceptPush: acceptPush }, { headers: this.headers })
      .toPromise()
      .then(response => response.json())
      .catch(this.handleError);
  }

  getUserInfo(params: any): Promise<any> {
    return this.http.get(`${this.API_BASE_URL}/auth/user_info`, { params: params })
      .toPromise()
      .then(response => response.json())
      .catch(this.handleError);
  }

  refreshToken(params: any): Promise<any> {
    return this.http.get(`${this.API_BASE_URL}/auth/${params.id}/refresh_token`)
      .toPromise()
      .then(response => response.json())
      .catch(this.handleError);
  }

  private handleError(error: any): Promise<any> {
    console.error('An error occurred', error);
    return Promise.reject(error.message || error);
  }

}
