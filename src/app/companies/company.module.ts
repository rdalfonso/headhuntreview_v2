import { NgModule } from '@angular/core';
import { CompanyListComponent } from './company-list.component';
import { CompanyDetailComponent } from './company-detail.component';
import { CompanyAddComponent } from './company-add.component';
import { CompanyAddConfirmComponent } from './company-add-confirm';
import { RouterModule } from '@angular/router';
import { CompanyService } from './company.service';
import { SharedModule } from './../shared/shared.module';

@NgModule({
  imports: [
    RouterModule.forChild([
        { path: 'companies', component: CompanyListComponent },
        { path: 'company/:id', component: CompanyDetailComponent },
        { path: 'companies/add', component: CompanyAddComponent },
        { path: 'company/add/confirm', component: CompanyAddConfirmComponent }
    ]),
    SharedModule
  ],
  declarations: [
    CompanyListComponent,
    CompanyDetailComponent,
    CompanyAddComponent,
    CompanyAddConfirmComponent
  ],
  providers: [
    CompanyService,
  ]
})
export class CompanyModule { }
