import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { RouterModule } from '@angular/router';
import { FormsModule } from '@angular/forms';

import { AppComponent } from './app.component';
import { AboutModule } from './shared/about.module';
import { AdminModule } from './admin/admin.module';
import { CandidateModule } from './candidates/candidate.module';
import { CompanyModule } from './companies/company.module';
import { RecruiterModule } from './recruiters/recruiter.module';
import { ReviewModule } from './reviews/review.module';
import { RequestInterceptor } from './shared/request.interceptor';
import { ErrorComponent } from './error/error.component';
import { WelcomeComponent } from './home/welcome.component';

import { SharedModule } from './shared/shared.module';

@NgModule({
  declarations: [
    AppComponent,
    WelcomeComponent,
    ErrorComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    AdminModule,
    HttpClientModule,
    RouterModule.forRoot([
        { path: 'welcome', component: WelcomeComponent },
        { path: '', redirectTo: 'welcome', pathMatch: 'full'},
        { path: '**', component: ErrorComponent }
    ]),
    ReviewModule,
    RecruiterModule,
    CompanyModule,
    CandidateModule,
    AboutModule,
    SharedModule
  ],
  providers: [
    { provide: HTTP_INTERCEPTORS, useClass: RequestInterceptor, multi: true }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
