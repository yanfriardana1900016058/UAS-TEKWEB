import { AuthComponent } from './../auth.component';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  email?: string;
  password?: string;

  constructor(
    public am: AuthComponent
  ) { 
    
  }

  ngOnInit(): void {
  }

  tapLogin() {
    this.am.tapLogin(this.email!, this.password!);
  }


}
