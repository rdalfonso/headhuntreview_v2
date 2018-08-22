import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { NgForm } from '@angular/forms';
import { Contact } from '../models/contact.model';

@Component({
  templateUrl: './contact.component.html',
  styleUrls: ['./contact.component.css']
})
export class ContactComponent implements OnInit {

  messageSent = false;
  model = new Contact('', '', '');

  constructor(
    private _route: ActivatedRoute,
    private _router: Router) {
  }

  ngOnInit() {
    this.messageSent = false;
  }

  submitForm(form: NgForm) {
    this.messageSent = true;
  }

  onBack(): void {
    this._router.navigate(['/recruiters']);
  }

  signup() {
    this._router.navigate(['/admin/signup']);
  }

  login() {
    this._router.navigate(['/admin/login']);
  }

  share() {
    this._router.navigate(['/admin/login']);
  }
}
