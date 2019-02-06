import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpResponse, HttpErrorResponse } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/observable/throw';
import 'rxjs/add/operator/catch';
import 'rxjs/add/operator/do';
import 'rxjs/add/operator/map';

import { IReview } from './review';
import { Review } from '../models/review.model';
import { environment } from '../../environments/environment';

@Injectable()
export class ReviewService {

    private _reviewUrl = environment.apiEndpoint;
    constructor(private _http: HttpClient) {

    }

    getReviews(): Observable<IReview[]> {
        return this._http.get<IReview[]>(this._reviewUrl + '/Review')
            .do(data => {})
            .catch(this.handleError);
    }

    getReviewsAdmin(): Observable<IReview[]> {
        return this._http.get<IReview[]>(this._reviewUrl + '/Admin/Review')
            .do(data => {})
            .catch(this.handleError);
    }

    getReview(id: string): Observable<IReview> {
      return this._http.get<IReview[]>(this._reviewUrl + '/Review/' + id)
          .do(data => {})
          .catch(this.handleError);
    }

    addReview(review: Review): Observable<any> {
      return this._http.post(this._reviewUrl + '/Review', JSON.stringify(review), {
        headers: new HttpHeaders().set('Content-Type', 'application/json'),
      })
      .map(this.extractData)
      .catch(this.handleError);
    }

    editReview(review: IReview): Observable<any> {
      return this._http.put(this._reviewUrl + '/Review/' + review.uniqueId, JSON.stringify(review), {
        headers: new HttpHeaders().set('Content-Type', 'application/json'),
      })
      .map(this.extractData)
      .catch(this.handleError);
    }

    deleteReview(id: string): Observable<any> {
      return this._http.delete(this._reviewUrl + '/Review/' + id, {
        headers: new HttpHeaders().set('Content-Type', 'application/json'),
      })
      .map(this.extractData)
      .catch(this.handleError);
    }

    deleteReviewList(reviewList: IReview[]): void {
      for (let _i = 0; _i < reviewList.length; _i++) {
        const review = reviewList[_i];
        if (review) {
          this.deleteReview(review.uniqueId).subscribe(
            recruiter =>  console.log('Review deleted ' + review.uniqueId),
            error => console.log(error));
        }
      }
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
