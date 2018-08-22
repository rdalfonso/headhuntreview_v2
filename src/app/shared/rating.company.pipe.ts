import { Pipe, PipeTransform } from '@angular/core';
import { IRecruiter } from '../recruiters/recruiter';
import { IReview } from '../reviews/review';

@Pipe({
    name: 'ratingcompany'
})
export class RatingCompany implements PipeTransform {
    transform(items: IRecruiter[], attr: string): any {

      let arrItems: IReview[] = [];
      for (let i = 0; i < items.length; i++) {
        arrItems = [ ...arrItems, ...items[i].reviews];
      }
      const finalAvg = Math.round( (arrItems.reduce((a, b) => a + b[attr], 0) / arrItems.length) );
      return finalAvg;
    }
}
