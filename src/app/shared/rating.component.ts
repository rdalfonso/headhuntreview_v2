
import { Component, OnInit, OnChanges, Input, EventEmitter, Output } from '@angular/core';

@Component({
  selector: 'app-rating',
  templateUrl: 'rating.component.html',
  styleUrls: ['rating.component.css']
})

export class RatingComponent implements OnInit {
    @Input() rating: number;
    @Input() itemId: number;
    @Input() itemStyle: number;
    @Output() ratingClick: EventEmitter<any> = new EventEmitter<any>();

    inputName: string;
    inputStyle: string;

    ngOnInit() {
      this.inputName = this.itemId + '_rating';
      this.inputStyle = (this.itemStyle === 1) ? 'rating' : 'rating-display';
    }

    onClick(rating: number): void {
        this.rating = rating;
        this.ratingClick.emit({
            itemId: this.itemId,
            rating: rating
        });
    }
}
