
import { Component, OnInit, Input} from '@angular/core';

@Component({
  selector: 'app-nav',
  templateUrl: './nav.component.html',
  styleUrls: ['./nav.component.css']
})

export class NavComponent implements OnInit {
    @Input() isAdmin: boolean;

    candidateURL: string;
    companyURL: string;
    reruiterURL: string;
    reviewURL: string;

    ngOnInit() {
      this.candidateURL = (this.isAdmin) ? '/admin/candidates' : '/candidates';
      this.companyURL =   (this.isAdmin) ? '/admin/companies'  : '/companies';
      this.reruiterURL =  (this.isAdmin) ? '/admin/recruiters' : '/recruiters';
      this.reviewURL =    (this.isAdmin) ? '/admin/reviews'    : '/reviews';
    }
}
