import { Component, OnInit } from '@angular/core';
import { FirebaseObjectObservable, AngularFireDatabase, FirebaseListObservable } from 'angularfire2/database';
import { ActivatedRoute, Params } from '@angular/router';

@Component({
  selector: 'app-group',
  templateUrl: './group.component.html',
  styleUrls: ['./group.component.css']
})
export class GroupComponent implements OnInit {
  public group: FirebaseObjectObservable<any>;
  public friends: FirebaseListObservable<any[]>;
  public actFriend: FirebaseObjectObservable<any>;
  private id: string = '';

  constructor(private db: AngularFireDatabase,
    public activatedRoute: ActivatedRoute) {


  }

  ngOnInit() {
    this.activatedRoute.params.subscribe((params: Params) => {
      this.id = params['id'];
    });
    this.group = this.db.object('groups/' + this.id);
    this.friends = this.db.list('groups/' + this.id + '/friends');
  }

  public findFriend(id: string) : any {
    this.actFriend = this.db.object('users/', { preserveSnapshot: true });
    this.actFriend.subscribe(snapshot => {
      console.log(snapshot.key)
      console.log(snapshot.val())
    });;
    // return this.actFrind;
  }

}
