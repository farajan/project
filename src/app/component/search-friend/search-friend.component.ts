import { Component, OnInit } from '@angular/core';
import { AngularFireAuth } from 'angularfire2/auth';
import { AngularFireDatabase, FirebaseListObservable } from 'angularfire2/database';
import { Subject } from 'rxjs/Subject';
import * as firebase from 'firebase/app';
import { Service } from '../../service/service';

@Component({
  selector: 'app-search-friend',
  templateUrl: './search-friend.component.html',
  styleUrls: ['./search-friend.component.css']
})
export class SearchFriendComponent implements OnInit {
  lastKeypress: number = 0;
  public user: FirebaseListObservable<any>;
  public users: FirebaseListObservable<any[]>;
  startAt = new Subject();
  endAt = new Subject();



  constructor(private afAuth: AngularFireAuth, public db: AngularFireDatabase, public actUser: Service) {
    this.afAuth.authState.subscribe(
      (auth) => {
        if (auth != null) {
          this.user = db.list('users/' + auth.uid);
        }
      });
  }


  public getFriend(start, end): FirebaseListObservable<any> {
    return this.db.list('/users', {
      query: {
        orderByChild: 'email',
        startAt: start,
        endAt: end,
        limit: 2
      }
    });
  }

  ngOnInit() {
    this.getFriend(this.startAt, this.endAt).subscribe(users => this.users = users);
  }

  search($event) {
    if ($event.timeStamp - this.lastKeypress > 1) {
      let q = $event.target.value;
      this.startAt.next(q);
      this.endAt.next(q + "\uf8ff");
    }
    this.lastKeypress = $event.timeStamp;
  }
  
  public addFriend(id): void {
    firebase.database().ref('/friends').push({ friend1: id, friend2: this.actUser.user.uid });
  }
}
