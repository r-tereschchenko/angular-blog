import { Component, OnInit } from '@angular/core';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import {ActivatedRoute, Params, Router} from '@angular/router';

import {User} from '../../shared/interfaces/interfaces';
import {AuthService} from '../shared/services/auth.service';
import {Subject} from 'rxjs';

@Component({
  selector: 'app-login-page',
  templateUrl: './login-page.component.html',
  styleUrls: ['./login-page.component.scss']
})
export class LoginPageComponent implements OnInit {

  params: string;
  isLoading = false;
  form: FormGroup;

  constructor(
    public auth: AuthService,
    private router: Router,
    private route: ActivatedRoute
  ) { }

  ngOnInit() {
    this.route.queryParams.subscribe((params: Params) => {
      if (params['loginAgain']) {
        this.params = 'Please, log in again. Your token has been expired';
      }
    });

    this.form = new FormGroup({
      email: new FormControl(null, [Validators.required, Validators.email]),
      password: new FormControl(null, [
        Validators.required,
        Validators.minLength(6)
      ])
    });
  }

  submit() {
    if (this.form.invalid) {
      return;
    }

    this.isLoading = true;
    const user: User = this.form.value;

    this.auth.login(user).subscribe((response) => {
      this.form.reset();
      console.log('login-page: ', response);
      this.router.navigate(['/admin', 'dashboard']);
      this.isLoading = false;
    }, (err) => {
      this.params = '';
      this.isLoading = false;
      console.log('From login-page: ', err);
    });
  }
}
