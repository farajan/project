import { Component, OnInit, Input } from '@angular/core';
import { AngularFireAuth } from 'angularfire2/auth';
import { AngularFireDatabase, FirebaseListObservable, FirebaseObjectObservable } from 'angularfire2/database';
import { Subject } from 'rxjs/Subject';
import * as firebase from 'firebase/app';
import { Service } from '../../service/service'
import { User } from '../../model/user';
import { ActivatedRoute, Params } from '@angular/router';

@Component({
  selector: 'app-search-friend',
  templateUrl: './search-friend.component.html',
  styleUrls: ['./search-friend.component.css']
})



export class SearchFriendComponent implements OnInit {

  @Input() name: string;

  public actFriend: FirebaseObjectObservable<any>;
  public user: FirebaseListObservable<any>;
  public users: any[];
  public idpar: string;
  public startWith = new Subject();
  public endWith = new Subject();
  public friend: boolean = false;

  constructor(
    private afAuth: AngularFireAuth, 
    public db: AngularFireDatabase, 
    public actUser: Service,
    public activatedRoute: ActivatedRoute) {
      
    this.afAuth.authState.subscribe(
      (auth) => {
        if (auth != null) {
          this.user = db.list('users/' + auth.uid);
        }
      });
  }

  ngOnInit() {
    console.log('ngOnInit');
    this.actUser.findCustomers(this.startWith, this.endWith)
      .subscribe(users => this.users = users);

    this.activatedRoute.params.subscribe((params: Params) => {
      this.idpar = params['id'];
    });
  }

  public addFriend(id: string, email: string, foto: string): void {
    firebase.database().ref('/users/' + this.actUser.user.uid + '/friends').child(id).set({ email: email, foto: foto });
  }


  public isFriend(id: string, email: string): void {

    console.log('USER: ', email);

    this.db.list('/users/' + this.actUser.user.uid + '/friends/' + id).subscribe(gr => {
      if (gr.length == 0) {
        console.log('this.friend == false');
        this.friend = false;
      } else {
        console.log('this.friend == true');
        this.friend = true;
      }
    });
  }

  public search($event: any): void {
    let queryText: string = $event.target.value;
    if (queryText.length > 0) {
      this.startWith.next(queryText)
      this.endWith.next(queryText + '\uf8ff')
    }
    else {
      this.users = [];
    }
  }
}


