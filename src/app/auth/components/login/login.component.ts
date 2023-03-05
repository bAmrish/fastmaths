import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {ActivatedRoute, Router} from '@angular/router';
import {AuthService} from '../../services/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  loginForm: FormGroup;
  next: string;
  userNameError = false;
  passwordError = false;
  loginError = false;

  constructor(private fb: FormBuilder,
              private authService: AuthService,
              private route: ActivatedRoute,
              private router: Router) {
    this.buildForm();
  }

  ngOnInit() {
    this.route.queryParams.subscribe((params) => {
      this.next = params['l'] || '/';
    })
  }

  buildForm() {
    this.loginForm = this.fb.group({
      username: ['', [Validators.required]],
      password: ['', [Validators.required]],
    })
  }

  onLogin() {
    this.userNameError = this.loginForm.get('username')?.errors?.['required'];
    this.passwordError = this.loginForm.get('password')?.errors?.['required'];
    if (this.loginForm.valid) {
      const username = this.loginForm.get('username')?.value || '';
      const password = this.loginForm.get('password')?.value || '';
      const success = this.authService.login(username, password)
      if (success) {
        this.router.navigate([this.next]).then();
      } else {
        this.loginError = true;
      }
    }
  }
}
