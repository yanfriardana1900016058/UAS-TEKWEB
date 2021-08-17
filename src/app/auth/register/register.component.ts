import { AuthComponent } from './../auth.component';
import { AngularFireAuth } from '@angular/fire/auth';
import { Router } from '@angular/router';
import { Component, OnInit } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent implements OnInit {
  register: any = {};

  constructor(
    public auth: AuthComponent
  ) { }

  ngOnInit(): void {
  }

  tapRegister() {
    this.auth.tapRegister(this.register);
  }

}
