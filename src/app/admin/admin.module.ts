import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { FormsModule } from '@angular/forms';

import { AdminComponent } from './adminComponent/admin.component';
import { AdminCompanyComponent } from './adminComponent/admin.company.component';
import { AdminCompanyDetailComponent } from './adminComponent/admin.company.detail.component';

import { AdminRecruiterComponent } from './adminComponent/admin.recruiter.component';
import { AdminRecruiterDetailComponent } from './adminComponent/admin.recruiter.detail.component';

import { AdminReviewComponent } from './adminComponent/admin.review.component';
import { AdminReviewDetailComponent } from './adminComponent/admin.review.detail.component';

import { AdminCandidateComponent } from './adminComponent/admin.candidate.component';
import { AdminCandidateDetailComponent } from './adminComponent/admin.candidate.detail.component';

import { LoginComponent } from './login/login.component';
import { ForgotComponent } from './login/forgot.component';
import { SignUpComponent } from './signUp/signup.component';

import { UserService } from './adminShared/user.service';
import { SharedModule } from '../shared/shared.module';

const AdmnRoutes = [
    {
      path: 'admin',
      component: AdminComponent,
      children: [
         { path: 'login', component: LoginComponent },
         { path: 'signup', component: SignUpComponent },
         { path: 'forgot', component: ForgotComponent },
         { path: 'companies', component: AdminCompanyComponent },
         { path: 'companies/:id', component: AdminCompanyDetailComponent },
         { path: 'recruiters', component: AdminRecruiterComponent },
         { path: 'recruiters/:id', component: AdminRecruiterDetailComponent },
         { path: 'reviews', component: AdminReviewComponent },
         { path: 'reviews/:id', component: AdminReviewDetailComponent },
         { path: 'candidates', component: AdminCandidateComponent },
         { path: 'candidates/:id', component: AdminCandidateDetailComponent },
      ]
    }
];

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    SharedModule,
    RouterModule.forChild(AdmnRoutes),
  ],
  exports: [
    RouterModule
  ],
  declarations: [
    AdminComponent,
    AdminCompanyComponent,
    AdminCompanyDetailComponent,
    AdminRecruiterComponent,
    AdminRecruiterDetailComponent,
    AdminReviewComponent,
    AdminReviewDetailComponent,
    AdminCandidateComponent,
    AdminCandidateDetailComponent,
    LoginComponent,
    ForgotComponent,
    SignUpComponent
  ],
  providers: [
    UserService
  ]
})
export class AdminModule { }
