import { Router } from '@angular/router';
import { AngularFireAuth } from '@angular/fire/auth';
import { AngularFirestore } from '@angular/fire/firestore';
import { Component, OnInit } from '@angular/core';
import { DatePipe } from '@angular/common';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {

  dataUser: any = {};
  listData: any = {};
  listCart: any = [];
  cart: any = {};

  isLoading: boolean = false;
  isEmpty: boolean = false;
  showMessage: boolean = false;
  
  totalCart: number = 0;
  now: number = Date.now();

  constructor(
    private fire: AngularFirestore,
    private datePipe: DatePipe,
    auth: AngularFireAuth,
    router: Router
  ) { 
    auth.authState.subscribe(resp => {
      if (!resp) {
        router.navigateByUrl('/auth')
      } else {
        this.fire.collection('user').ref.where('email', '==', resp!.email).onSnapshot(snapshot => {
          snapshot.forEach(ref => {
            this.dataUser = ref.data();
            this.getData();
          })
        })
      }
    });

  }

  ngOnInit(): void {
  }

  getData() {
    this.fire.collection('product', ref => ref.orderBy('created_at', 'desc')).snapshotChanges().subscribe((resp) => {
      this.listData = resp
      if (this.listData.length === 0) {
        this.isEmpty = true;
      }
      else {
        this.isEmpty = false;
      }
    })
  }

  addCart(data: any) {
    this.listCart.push(data);
    this.totalCart += data.price;
  }

  deleteCart(id: any) {
    this.totalCart -= this.listCart[id].price;
    this.listCart.splice(id, 1);
  }

  tapBayar() {
    this.isLoading = true;
    this.cart['list_product'] = this.listCart;
    this.cart['total'] = this.totalCart;
    this.cart['created_at'] = this.datePipe.transform(this.now, 'MMM d, y, h:mm:ss a');
    this.cart['user'] = this.dataUser.username;

    this.fire.collection('transaction').add(this.cart).then((resp) => {
      this.listCart = [];
      this.totalCart = 0;
      this.isLoading = false;
      this.showMessage = true;
    });
  }

  closeAlert() {
    this.showMessage = false;
  }

}
