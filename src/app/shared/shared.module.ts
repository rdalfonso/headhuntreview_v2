import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';

import { RatingComponent } from './rating.component';
import { NavComponent } from './nav.component';
import { TruncatePipe } from './truncate.pipe';
import { RatingRecruiter } from './rating.recruiter.pipe';
import { RatingCompany } from './rating.company.pipe';
import { SafePipe } from './trust.url.pipe';

@NgModule({
  imports: [
    CommonModule,
    RouterModule
  ],
  declarations: [
    RatingComponent,
    NavComponent,
    TruncatePipe,
    SafePipe,
    RatingRecruiter,
    RatingCompany
  ],
  exports: [
    RatingComponent,
    NavComponent,
    CommonModule,
    FormsModule,
    TruncatePipe,
    SafePipe,
    RatingRecruiter,
    RatingCompany
  ]
})
export class SharedModule { }
