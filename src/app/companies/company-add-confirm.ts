import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { environment } from '../../environments/environment';

@Component({
  templateUrl: './company-add-confirm.html'
})
export class CompanyAddConfirmComponent implements OnInit {
  IsLoggedin = false;

  constructor(private _route: ActivatedRoute,
    private _router: Router) {
  }

  ngOnInit() {
    const param = this._route.snapshot.paramMap.get('id');
  }

  onBack(): void {
    this._router.navigate(['/companies']);
  }
}
