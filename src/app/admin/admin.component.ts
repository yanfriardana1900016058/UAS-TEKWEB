import { Router } from '@angular/router';
import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';

@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.scss']
})

export class AdminComponent implements OnInit {


  @ViewChild('sidebarMenu') sidebar?: ElementRef;
  

  constructor(
    public auth: AngularFireAuth,
    public router: Router
  ) { 
    auth.authState.subscribe(resp => {
      if (!resp) {
        router.navigateByUrl('/auth')
      }
    })

    console.log(router.url);    
  }

  ngOnInit(): void {
  }

  signOut() {
    var _confirm = confirm('yakin ingin keluar ?');

    if(_confirm) {
      this.auth.signOut().then(resp => {
        this.router.navigateByUrl('auth');
      });
    }
  }

}
