import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
    name: 'ratingrecruiter'
})
export class RatingRecruiter implements PipeTransform {
    transform(items: any[], attr: string): any {
        return Math.round( (items.reduce((a, b) => a + b[attr], 0) / items.length) );
    }
}
