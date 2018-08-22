import { Component, NgModule, Injectable } from '@angular/core';
import { HttpEvent, HttpInterceptor, HttpHandler, HttpRequest } from '@angular/common/http';

import { Observable } from 'rxjs/Observable';
import { UserService } from './../admin/adminShared/user.service';
import * as firebase from 'firebase';

@Injectable()
export class RequestInterceptor implements HttpInterceptor {
  token: string;
  intercept(req: HttpRequest<any>, next: HttpHandler) {
    const userKey = Object.keys(sessionStorage).filter(it => it.startsWith('firebase:authUser'))[0];
    const user = userKey ? JSON.parse(sessionStorage.getItem(userKey)) : undefined;
    if (user !== undefined) {
      this.token = user.stsTokenManager.accessToken;
    }
    const authReq = req.clone({ setHeaders: { Authorization: 'Bearer ' + this.token }});
    return next.handle(authReq);
  }
}
