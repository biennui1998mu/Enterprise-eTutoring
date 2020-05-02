import { Component, OnInit } from '@angular/core';
import { UserService } from '../../../shared/services/state/user';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';

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
      console.log(data);
    });
  }
}
