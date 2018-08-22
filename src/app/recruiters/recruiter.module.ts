import { NgModule } from '@angular/core';
import { RecruiterListComponent } from './recruiter-list.component';
import { RecruiterDetailComponent } from './recruiter-detail.component';
import { RecruiterAddComponent } from './recruiter-add.component';
import { RecruiterAddConfirmComponent } from './recruiter-add-confirm';
import { RecruiterInviteComponent } from './recruiter-invite.component';
import { RouterModule } from '@angular/router';
import { RecruiterService } from './recruiter.service';
import { SharedModule } from './../shared/shared.module';

@NgModule({
  imports: [
    RouterModule.forChild([
        { path: 'recruiters', component: RecruiterListComponent },
        { path: 'recruiter/:id', component: RecruiterDetailComponent },
        { path: 'recruiters/company/:id', component: RecruiterListComponent },
        { path: 'recruiters/add/:id', component: RecruiterAddComponent },
        { path: 'recruiter/invite/join', component: RecruiterInviteComponent },
        { path: 'recruiter/add/confirm', component: RecruiterAddConfirmComponent }
    ]),
    SharedModule
  ],
  declarations: [
    RecruiterListComponent,
    RecruiterDetailComponent,
    RecruiterAddComponent,
    RecruiterAddConfirmComponent,
    RecruiterInviteComponent
  ],
  providers: [
    RecruiterService,
  ]
})
export class RecruiterModule { }
