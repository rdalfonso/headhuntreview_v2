import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router, Params  } from '@angular/router';
import { NgForm } from '@angular/forms';
import { Recruiter } from '../models/recruiter.model';
import { RecruiterService } from './recruiter.service';
import { ICompany } from '../companies/company';
import { CompanyService } from '../companies/company.service';
import { UserService } from './../admin/adminShared/user.service';
import { Observable, Subject } from 'rxjs/';

@Component({
  templateUrl: './recruiter-add.component.html',
  styleUrls: ['./recruiter-add.component.css']
})
export class RecruiterAddComponent implements OnInit {

  public companies: Observable<any[]>;
  private searchTerms = new Subject<string>();
  public CompanyName = '';
  public flag = true;
  IsLoggedin = false;
  redirect = '/recruiters';
  filteredCompanies: ICompany[];
  model = new Recruiter('', '', '', '', '', 0, '', '');
  experienceLevels = ['Junior', 'Mid-level', 'Senior'];

  constructor(
    private _router: Router,
    private _activatedRoute: ActivatedRoute,
    private _recruiterService: RecruiterService,
    private _companyService: CompanyService,
    private _userService: UserService) {
  }

  ngOnInit(): void {
    this.IsLoggedin = this._userService.verifyAuth();
    const param = this._activatedRoute.snapshot.paramMap.get('id');
    if (param) {
      this.getCompany(param);
    }

    this._activatedRoute.queryParams
      .filter(params => params.mode)
      .subscribe(params => {
        this.redirect = '/' + params.mode + this.redirect;
      });

    this.companies = this.searchTerms
      .debounceTime(300)
      .distinctUntilChanged()
      .switchMap(term => term ? this._companyService.searchCompanies(term) : Observable.of<ICompany[]>([]))
      .catch(error => {
        console.log(error);
        return Observable.of<ICompany[]>([]);
      });
  }

  searchCompanies(term: string): void {
    this.flag = true;
    this.searchTerms.next(term);
  }

  onselectCompany(company) {
    if (company) {
      this.model.companyName = company.name;
      this.model.companyId = company.uniqueId;
      this.flag = false;
    }
  }

  getCompany(id: string) {
    this._companyService.getCompany(id).subscribe(
      (company) => {
        if (company) {
          this.model.companyName = company.name;
          this.model.companyId = company.uniqueId;
          this.flag = false;
        }
      },
      error => console.log(error));
  }

  nameToUpperCase(value: string) {
     if (value.length > 0) {
       this.model.name = value.charAt(0).toUpperCase() + value.slice(1);
     } else {
       this.model.name = value;
     }
    }

  ratingComponetClick(clickObj: any): void {
        console.log(`The Item ${clickObj.itemId}
            has been given ${clickObj.rating} stars,
            now is time to update the item with the new rating`);

            this.model.stars = clickObj.rating;
  }

  onBack(): void {
    this._router.navigate([this.redirect]);
  }

  submitForm(form: NgForm) {
    console.log('this.model', this.model)
    this._recruiterService.addRecruiter(this.model)
      .subscribe(
          result => this._router.navigate(['/recruiter/add/confirm']),
          error => console.log(error)
    );
  }
}
