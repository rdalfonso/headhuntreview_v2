import { NgModule } from '@angular/core';
import { ReviewListComponent } from './review-list.component';
import { ReviewDetailComponent } from './review-detail.component';
import { ReviewAddComponent } from './review-add.component';
import { RouterModule } from '@angular/router';
import { ReviewService } from './review.service';
import { SharedModule } from './../shared/shared.module';

@NgModule({
  imports: [
    RouterModule.forChild([
        { path: 'reviews', component: ReviewListComponent },
        { path: 'review/:id', component: ReviewDetailComponent },
        { path: 'reviews/add/:id', component: ReviewAddComponent },
    ]),
    SharedModule
  ],
  declarations: [
    ReviewListComponent,
    ReviewDetailComponent,
    ReviewAddComponent
  ],
  providers: [
    ReviewService,
  ]
})
export class ReviewModule { }
