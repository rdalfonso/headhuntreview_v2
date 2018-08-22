import { NgModule } from '@angular/core';
import { CandidateListComponent } from './candidate-list.component';
import { CandidateDetailComponent } from './candidate-detail.component';
import { CandidateProfileComponent } from './candidate-profile.component';
import { CandidateAddComponent } from './candidate-add.component';
import { RouterModule } from '@angular/router';
import { CandidateService } from './candidate.service';
import { SharedModule } from './../shared/shared.module';

@NgModule({
  imports: [
    RouterModule.forChild([
        { path: 'candidates', component: CandidateListComponent },
        { path: 'candidate/:id', component: CandidateDetailComponent },
        { path: 'profile/:id', component: CandidateProfileComponent },
        { path: 'candidates/add', component: CandidateAddComponent }
    ]),
    SharedModule
  ],
  declarations: [
    CandidateListComponent,
    CandidateDetailComponent,
    CandidateAddComponent,
    CandidateProfileComponent
  ],
  providers: [
    CandidateService,
  ]
})
export class CandidateModule { }
