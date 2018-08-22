import { Component } from '@angular/core';
import { UserService } from '../adminShared/user.service';
import { Router} from '@angular/router';
import { NgForm } from '@angular/forms';
import { Signup } from '../../models/signup.model';
import { Item } from '../../models/item.model';
import { ICandidate } from '../../candidates/candidate';
import { CandidateService } from '../../candidates/candidate.service';

@Component({
    templateUrl: './signup.component.html',
    styleUrls: ['./signup.component.css']
})
export class SignUpComponent {
    type: string;
    email: string;
    password1: string;
    password2: string;
    passwordFail = false;
    model = new Signup('', '', '', '', '', '', '', false);
    radioSel:any;
    radioSelected:string;
    radioSelectedString:string;
    itemsList: Item[] = [
      {
        name:'I am a Candidate ',
        value:'candidate'
      },
      {
        name:'I am a Recruiter',
        value:'recruiter'
      },
    ];

    constructor(
      private userSVC: UserService,
      private router: Router) {

        this.radioSelected = "candidate";
        this.getSelecteditem();
    }

    // Get row item from array
      getSelecteditem(){
        this.radioSel = this.itemsList.find(Item => Item.value === this.radioSelected);
        this.radioSelectedString = JSON.stringify(this.radioSel);
      }
      // Radio Change Event
      onItemChange(item){
        this.getSelecteditem();
      }

    submitForm(form: NgForm)  {
      console.log('this.model', this.model)
      if (this.model.password1 !== this.model.password2) {
        this.passwordFail = true;
      } else {
        this.passwordFail = false;
        this.userSVC.register(this.model.name, this.model.title, this.model.email, this.model.password1);
        this.userSVC.verifyUser();
      }
    }

    cancel() {
      this.router.navigate(['/admin/login']);
    }
}
