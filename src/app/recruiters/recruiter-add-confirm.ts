import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { environment } from '../../environments/environment';

@Component({
  templateUrl: './recruiter-add-confirm.html'
})
export class RecruiterAddConfirmComponent implements OnInit {
  IsLoggedin = false;

  constructor(private _route: ActivatedRoute,
    private _router: Router) {
  }

  ngOnInit() {
    const param = this._route.snapshot.paramMap.get('id');
  }

  onBack(): void {
    this._router.navigate(['/recruiters']);
  }
}
