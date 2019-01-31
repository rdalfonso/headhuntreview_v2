import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpResponse, HttpErrorResponse } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/observable/throw';
import 'rxjs/add/operator/catch';
import 'rxjs/add/operator/do';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';

import { ICompany } from './company';
import { Company } from '../models/company.model';
import { environment } from '../../environments/environment';

@Injectable()
export class CompanyService {
    private _companyUrl = "http://35.222.255.128/api/"; //environment.apiEndpoint;
    constructor(private _http: HttpClient) { }

    searchCompanies(term: string): Observable<ICompany[]> {
      return this._http.get<ICompany[]>(this._companyUrl + '/Search/' + term)
          .do(data => console.log('data found'))
          .catch(this.handleError);
    }

    getCompanies(): Observable<ICompany[]> {
        return this._http.get<ICompany[]>(this._companyUrl + '/Company')
            .do(data => console.log('data found'))
            .catch(e => {
              if (e.status === 401) {
                  return Observable.throw('Unauthorized');
              }
        });
    }

    getCompaniesAdmin(): Observable<ICompany[]> {
        return this._http.get<ICompany[]>(this._companyUrl + '/Admin/Company')
            .do(data => console.log('data found'))
            .catch(e => {
              if (e.status === 401) {
                  return Observable.throw('Unauthorized');
              }
        });
    }

    getCompany(id: string): Observable<ICompany> {
        return this._http.get<ICompany[]>(this._companyUrl + '/Company/' + id)
                .do(data => console.log('data found'))
                .catch(this.handleError);
    }

    addCompany(company: Company): Observable<any>  {
      return this._http.post(this._companyUrl + '/Company', JSON.stringify(company), {
        headers: new HttpHeaders().set('Content-Type', 'application/json'),
      })
      .map(this.extractData)
      .catch(this.handleError);
    }

    editCompany(company: ICompany): Observable<any>  {
      return this._http.put(this._companyUrl + '/Company/' + company.uniqueId, JSON.stringify(company), {
        headers: new HttpHeaders().set('Content-Type', 'application/json'),
      })
      .map(this.extractData)
      .catch(this.handleError);
    }

    deleteCompany(id: string): Observable<any> {
      return this._http.delete(this._companyUrl + '/Company/' + id, {
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
      return Observable.throw(errorMessage);
    }
}
