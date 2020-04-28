import { Component, OnInit } from '@angular/core';
import { TaigaApiService } from '../services/taiga-api.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  login: string;
  pass: string;

  constructor(private apiService: TaigaApiService,
              private router: Router) { }

  ngOnInit() {
  }

  loginUser() {
    this.apiService.loginUser(this.login, this.pass).subscribe((res: any) => {
      localStorage.setItem('token', res.auth_token);
      localStorage.setItem('id', res.id);
      this.router.navigate(['/projects']);
    });
  }
}
