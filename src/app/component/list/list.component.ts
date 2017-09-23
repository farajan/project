import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params } from '@angular/router';
import { AngularFireDatabase, FirebaseObjectObservable, FirebaseListObservable } from 'angularfire2/database';
import * as firebase from 'firebase/app';
import { NgbModal, ModalDismissReasons, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';

import { Service } from '../../service/service';
import { CapitalizePipe } from '../../pipe/capitalize.pipe';

@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.css']
})
export class ListComponent implements OnInit {

  list: FirebaseObjectObservable<any>;

  items: FirebaseListObservable<any[]>;

  food: FirebaseListObservable<any[]>;
  private modalWindow: NgbModalRef;
  private id: string = '';
  private checked: string[] = [];
  public tmp: string = '';
  public count: number = 0;


  constructor(private db: AngularFireDatabase,
    public activatedRoute: ActivatedRoute,
    public service: Service,
    private modalService: NgbModal) {
    this.activatedRoute.params.subscribe((params: Params) => {
      this.id = params['id'];
    });

    this.list = db.object('/lists/' + this.id);
    this.items = db.list('/food');
    
    this.food = db.list('/food', {
      query: {
        orderByChild: 'lid',
        equalTo: this.id
      }
    });
  }

  ngOnInit() {
  }

  open(content) {
    this.modalWindow = this.modalService.open(content);
  }

  public search(value: string) {
    this.db.list('/food', {
      query: {
        orderByChild: 'value',
        equalTo: value
      }
    }).subscribe(queriedItems => {
      return queriedItems.length;
    });
  }

  public searchItems(value: string): void {
    this.db.list('/food', {
          query: {
            orderByChild: 'value',
            equalTo: value
        }
      }).subscribe(item => {
        console.log('item: ' + item.length);
        this.count = item.length;
      });

  }

  public onChange(id: string, flag): void {
    console.log(id + " : " + flag);
    if (flag) {
      this.checked.push(id);
    } else {
      this.checked = this.checked.filter(item => item.toString() !== id);
    }
  }

  public resetChecked() {
    this.checked = this.checked.filter(item => item.toString() == '');
  }

  public deleteItems(): void {
    this.checked.forEach(id => {
      this.items.remove(id);
    });
    this.resetChecked();
    this.modalWindow.close();
  }

  public bookItems(): void {
    this.checked.forEach(id => {
      this.items.update(id, { reserved: '1', email: this.service.user.email });
    });
    this.resetChecked();
  }

  public unSelect(): void {
    this.checked.forEach(id => {
      this.items.update(id, { reserved: '0', email: '' });
    });
    this.resetChecked();
  }

  public buyItems(): void {
    this.checked.forEach(id => {
      this.items.update(id, { reserved: '2', email: this.service.user.email });
    });
    this.resetChecked();
    this.modalWindow.close();
  }

  public getResult(reserved: string): string {
    return reserved == '2' ? 'Purchased' : 'Reserved';
  }

  public increaseQuantity(id: string, newQuantity: number): void {
    this.items.update(id, { quantity: ++newQuantity });
  }

  public reduceQuantity(id: string, newQuantity: number): void {
    if (newQuantity > 1) {
      this.items.update(id, { quantity: --newQuantity });
    }
  }

}
