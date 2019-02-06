import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpResponse, HttpErrorResponse } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/observable/throw';
import 'rxjs/add/operator/catch';
import 'rxjs/add/operator/do';
import 'rxjs/add/operator/map';

import { ICandidate } from './candidate';
import { Candidate } from '../models/candidate.model';
import { environment } from '../../environments/environment';

@Injectable()
export class CandidateService {
    private _candidateUrl = environment.apiEndpoint;
    constructor(private _http: HttpClient) { }

    getCandidates(): Observable<ICandidate[]> {
        return this._http.get<ICandidate[]>(this._candidateUrl + 'Candidate')
            .do(data => {})
            .catch(this.handleError);
    }

    getCandidatesAdmin(): Observable<ICandidate[]> {
        return this._http.get<ICandidate[]>(this._candidateUrl + 'Admin/Candidate')
            .do(data => {})
            .catch(this.handleError);
    }

    getCandidate(id: string): Observable<ICandidate> {
      return this._http.get<ICandidate[]>(this._candidateUrl + 'Candidate/' + id)
        .do(data => {})
        .catch(this.handleError);

    }

    getCandidateAuth(id: string): Observable<ICandidate> {
      return this.getCandidates()
        .map((candidates: ICandidate[]) => candidates.find(r => r.fireBaseId === id));
    }

    addCandidate(candidate: Candidate): Observable<any>  {
      return this._http.post(this._candidateUrl + '/Candidate', JSON.stringify(candidate), {
        headers: new HttpHeaders().set('Content-Type', 'application/json'),
      })
      .map(this.extractData)
      .catch(this.handleError);
    }

    editCandidate(candidate: any): Observable<any>  {
      return this._http.put(this._candidateUrl + 'Candidate/' + candidate.uniqueId, JSON.stringify(candidate), {
        headers: new HttpHeaders().set('Content-Type', 'application/json'),
      })
      .map(this.extractData)
      .catch(this.handleError);
    }

    deleteCandidate(id: string): Observable<any> {
      return this._http.delete(this._candidateUrl + '/' + id, {
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
