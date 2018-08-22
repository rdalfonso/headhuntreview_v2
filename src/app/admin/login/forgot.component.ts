import { Component } from '@angular/core';
import { UserService } from '../adminShared/user.service';
import { Router } from '@angular/router';
import { NgForm } from '@angular/forms';
import { Login } from '../../models/login.model';

@Component({
  templateUrl: './forgot.component.html',
  styleUrls: ['./login.component.css']
 })

export class ForgotComponent {
  email: string;
  password1: string;
  model = new Login('', '');

  constructor(private userSVC: UserService, private router: Router) { }

  submitForm(form: NgForm) {
    this.userSVC.sendPasswordEmail(this.model.email);
    this.router.navigate(['/admin/login']);
  }

  cancel() {
    this.router.navigate(['/admin/login']);
  }
}
