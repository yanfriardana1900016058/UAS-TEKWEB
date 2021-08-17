import { AngularFirestore } from '@angular/fire/firestore';
import { Router } from '@angular/router';
import { Component, OnInit } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';

@Component({
  selector: 'app-auth',
  templateUrl: './auth.component.html',
  styleUrls: ['./auth.component.scss']
})
export class AuthComponent implements OnInit {
  loading: boolean = false;
  errorMessage?: String;
  showError: boolean = false;

  constructor(
    public auth: AngularFireAuth,
    public route: Router,
    public fire: AngularFirestore
  ) {
    auth.authState.subscribe(resp => {
      if (resp) {
        route.navigateByUrl('admin')
      }
    })
   }

  ngOnInit(): void {
  }

  tapLogin(email : string, password :string) {
    this.loading = true;
    this.auth.signInWithEmailAndPassword(
      email,
      password
    ).then((resp) => {
      this.loading = false;
      this.route.navigateByUrl('admin');
    }).catch((err) => {
      this.loading = false;
      switch (err['code']) {
        case 'auth/invalid-email':
          this.errorMessage = 'Email anda salah !';
          break;
        case 'auth/user-not-found':
          this.errorMessage = 'User tidak ditemukan !';
          break;
        default:
          this.errorMessage = 'Periksa kembali data anda !';
          console.log(err)
          break;
      }
      this.showError = true;

    })
  }

  tapRegister(register: any) {
    this.loading = true;
    this.auth.createUserWithEmailAndPassword(
      register.email,
      register.password
    ).then((resp) => {
      this.route.navigateByUrl('signin');
      register['role'] = 'user';
      this.fire.collection('user').add(register)
      this.loading = false;
    }).catch((err) => {
      this.loading = false;
      this.errorMessage = err['message'];
      this.showError = true;
    })
  }

  closeAlert() {
    this.showError = false;
  }
}
