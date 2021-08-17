import { AdminComponent } from './../admin/admin.component';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss']
})
export class NavbarComponent implements OnInit {

  constructor(
    public am: AdminComponent
  ) { }

  ngOnInit(): void {
  }

  logOut() {
    this.am.signOut();
  }

}
