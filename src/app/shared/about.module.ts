import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AboutComponent } from './about.component';
import { ContactComponent } from './contact.component';
import { RouterModule } from '@angular/router';
import { FormsModule } from '@angular/forms';

@NgModule({
  imports: [
    RouterModule.forChild([
        { path: 'about', component: AboutComponent },
        { path: 'contact', component: ContactComponent }
    ]),
    CommonModule,
    FormsModule
  ],
  declarations: [
    AboutComponent,
    ContactComponent
  ],
  exports: [
    AboutComponent,
    ContactComponent
  ]
})
export class AboutModule { }
