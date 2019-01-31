import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpResponse, HttpErrorResponse } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/observable/throw';
import 'rxjs/add/operator/catch';
import 'rxjs/add/operator/do';
import 'rxjs/add/operator/map';

import { IRecruiter } from './recruiter';
import { Recruiter } from '../models/recruiter.model';
import { environment } from '../../environments/environment';

@Injectable()
export class RecruiterService {
    private _recruitUrl = 'http://35.222.255.128/api/Recruiter';
    constructor(private _http: HttpClient) { }

    getRecruiters(): Observable<IRecruiter[]> {
        return this._http.get<IRecruiter[]>(this._recruitUrl)
            .do(data => {})
            .catch(this.handleError);
    }

    getRecruitersAdmin(): Observable<IRecruiter[]> {
        return this._http.get<IRecruiter[]>(environment.apiEndpoint + '/Admin/Recruiter')
            .do(data => {})
            .catch(this.handleError);
    }

    getRecruiter(id: string): Observable<IRecruiter> {
      return this._http.get<IRecruiter[]>(this._recruitUrl + '/' + id)
          .do(data => {})
          .catch(this.handleError);
    }

    addRecruiter(recruiter: Recruiter): Observable<any> {
      return this._http.post(this._recruitUrl, JSON.stringify(recruiter), {
        headers: new HttpHeaders().set('Content-Type', 'application/json'),
      })
      .map(this.extractData)
      .catch(this.handleError);
    }

    editRecruiter(recruiter: any): Observable<any> {
      return this._http.put(this._recruitUrl + '/' + recruiter.uniqueId, JSON.stringify(recruiter), {
        headers: new HttpHeaders().set('Content-Type', 'application/json'),
      })
      .map(this.extractData)
      .catch(this.handleError);
    }

    deleteRecruiter(id: string): Observable<any> {
      return this._http.delete(this._recruitUrl + '/' + id, {
        headers: new HttpHeaders().set('Content-Type', 'application/json'),
      })
      .map(this.extractData)
      .catch(this.handleError);
    }

    private extractData(res: Object) {
      const body = JSON.stringify(res);
      return body || {};
    }

    private handleError(err: HttpErrorResponse) {
      let errorMessage = '';
      if (err.error instanceof Error) {
          errorMessage = `An error occurred: ${err.error.message}`;
      } else {
          errorMessage = `Server returned code: ${err.status}, error message is: ${err.message}`;
      }
      console.error(errorMessage);
      return Observable.throw(errorMessage);
    }
}
