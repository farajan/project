import { any } from 'codelyzer/util/function';
import { Subject } from 'rxjs/Subject';
import { AngularFireDatabase, FirebaseObjectObservable, FirebaseListObservable } from 'angularfire2/database';


// import { FirebaseObjectFactoryOpts } from 'angularfire2/interfaces';


import { Component, OnInit, NgModule } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { Router } from '@angular/router';
import { AngularFireAuth } from 'angularfire2/auth';
import * as firebase from 'firebase/app';
import { NgbModalRef, NgbModal, ModalDismissReasons } from '@ng-bootstrap/ng-bootstrap';

import { User } from '../../model/user';
import { Service } from '../../service/service';


@Component({
  selector: 'app-friends',
  templateUrl: './friends.component.html',
  styleUrls: ['./friends.component.css']
})
export class FriendsComponent implements OnInit {
  public actFriend: FirebaseListObservable<any[]>;
  public friend: FirebaseObjectObservable<any>;
  public friends: FirebaseListObservable<any[]>;

  constructor(public db: AngularFireDatabase, public actUser: Service) {
  }

  ngOnInit() {
    this.friends = this.db.list('/friends', {
      query: {
        orderByChild: 'friend2',
        equalTo: this.actUser.user.uid
      }
    });
  }


  public deleteFriend(id): void {
    this.friend = this.db.object('/friends/' + id);
    this.friend.remove();
  }

  public findFriend(id): void {
    this.actFriend = this.db.list('/users', {
      query: {
        orderByChild: 'uid',
        equalTo: id
      }
    });
  }
}
