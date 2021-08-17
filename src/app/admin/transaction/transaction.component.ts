import { AngularFirestore } from '@angular/fire/firestore';
import { Component, OnInit } from '@angular/core';


@Component({
  selector: 'app-transaction',
  templateUrl: './transaction.component.html',
  styleUrls: ['./transaction.component.scss']
})
export class TransactionComponent implements OnInit {
  
  listData: any = {}
  isEmpty: boolean = true;

  constructor(
    private fire: AngularFirestore,
  ) { 
    this.getData();
  }

  ngOnInit(): void {
  }

  getData() {
    this.fire.collection('transaction', ref => ref.orderBy('created_at', 'desc')).snapshotChanges().subscribe((resp) => {
      this.listData = resp
      if (this.listData.length === 0) {
        this.isEmpty = true;
      }
      else {
        this.isEmpty = false;
      }
    })
  }

}
