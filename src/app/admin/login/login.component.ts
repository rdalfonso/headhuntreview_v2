import { Component } from '@angular/core';
import { UserService } from '../adminShared/user.service';
import { Router } from '@angular/router';
import { NgForm } from '@angular/forms';
import { Login } from '../../models/login.model';

@Component({
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
 })

export class LoginComponent {
  email: string;
  password1: string;
  model = new Login('', '');

  constructor(private userSVC: UserService, private router: Router) { }

  submitForm(form: NgForm) {
    this.userSVC.login(this.model.email, this.model.password1);
  }

  forgot() {
    this.router.navigate(['/admin/forgot']);
  }

  cancel() {
    this.router.navigate(['']);
  }



}
