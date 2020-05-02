import { Component, OnInit } from '@angular/core';
import { UserService } from '../../../shared/services/state/user';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { User, USER_TYPE } from '../../../shared/interface/User';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent implements OnInit {

  username = new FormControl('', [
    Validators.required, Validators.email,
  ]);

  password = new FormControl('', [
    Validators.required,
  ]);

  loginForm: FormGroup;

  constructor(
    private userService: UserService,
    private fb: FormBuilder,
    private router: Router,
  ) {
  }

  ngOnInit(): void {
    this.loginForm = this.fb.group({
      username: this.username,
      password: this.password,
    });
  }

  login() {
    this.userService.login(
      this.loginForm.value,
    ).subscribe(data => {
      if (data) {
        // TODO redirect?
        this.navigateSuccess(data);
      }
    });
  }

  private navigateSuccess(user: User) {
    let navigateArray = [];
    if (
      user.level === USER_TYPE.student ||
      user.level === USER_TYPE.tutor
    ) {
      navigateArray = ['/client', 'dashboard'];
    } else if (user.level === USER_TYPE.staff) {
      navigateArray = ['/staff', 'dashboard'];
    }

    if (navigateArray.length > 0) {
      this.router.navigate(navigateArray);
    }
  }
}
