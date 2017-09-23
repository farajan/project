import { Component, OnInit } from '@angular/core';
import { NgbModalRef, NgbModal, ModalDismissReasons } from '@ng-bootstrap/ng-bootstrap';
import { FirebaseListObservable, FirebaseObjectObservable, AngularFireDatabase } from 'angularfire2/database';
import { ActivatedRoute, Params } from '@angular/router';

@Component({
  selector: 'app-group-lists-menu',
  templateUrl: './group-lists-menu.component.html',
  styleUrls: ['./group-lists-menu.component.css']
})
export class GroupListsMenuComponent implements OnInit {

  private modalWindow: NgbModalRef;
  private parid: string;

  constructor(private modalService: NgbModal, public db: AngularFireDatabase,
    public activatedRoute: ActivatedRoute) {

  }

  ngOnInit() {
    this.activatedRoute.params.subscribe((params: Params) => {
      this.parid = params['id'];
    });
  }

  open(content) {
    this.modalWindow = this.modalService.open(content);
  }

  private delList(idlist: string): void {

    this.db.list('lists/' + idlist + '/users', { preserveSnapshot: true }).subscribe(delUsers => {
      delUsers.forEach(delUser => {
        console.log('mazani listu, ktere nalezeli dane skupine z uzivatele');
        console.log('users/' + delUser.key + '/lists/' + idlist);
        this.db.object('users/' + delUser.key + '/lists/' + idlist).remove();
        this.db.object('users/' + delUser.key + '/groups/' + this.parid).remove();
      })
    });
  }

  public deleteGroup(): void {
    console.log('deletegroup');

    this.db.list('groups/' + this.parid + '/lists', { preserveSnapshot: true }).subscribe(snapshots => {
      snapshots.forEach(snapshot => {
        // console.log('mazani listu, ktere nalezeli dane skupine z uzivatelu');
        this.delList(snapshot.key);

      })
    }); // mazani listu, ktere nalezeli dane skupine z uzivatelu

    // this.db.list('groups/' + this.parid + '/lists', { preserveSnapshot: true }).subscribe(snapshots => {
    //   snapshots.forEach(snapshot => {
    //     console.log('mazani listu, ktere nalezeli dane skupine z listu');
    //     console.log('lists/' + snapshot.key());
    //     this.db.object('lists/' + snapshot.key).remove();
    //   })
    // }); // mazani listu, ktere nalezeli dane skupine z listu
    // console.log('mazani skupiny ze skupiny');
    // console.log('/groups/' + this.parid);
    // this.db.object('/groups/' + this.parid).remove(); // mazani skupiny ze skupiny
  }



  public updateGroup(newValue: string): void { // upravit!!!
    this.db.list('groups/' + this.parid + '/lists', { preserveSnapshot: true }).subscribe(snapshots => {
      snapshots.forEach(snapshot => {

        this.db.list('lists/' + snapshot.key + '/users', { preserveSnapshot: true }).subscribe(delUsers => {
          delUsers.forEach(delUser => {
            this.db.object('users/' + delUser.key + '/lists').update({ name: newValue });
          })
        });

      })
    });

    // this.db.list('groups/' + this.parid + '/lists', { preserveSnapshot: true }).subscribe(snapshots => {
    //   snapshots.forEach(snapshot => {
    //     this.db.object('lists/' + snapshot.key).update({ name: newValue });
    //   })
    // });
    // this.db.object('/groups/' + this.parid).update({ name: newValue });
    this.modalWindow.close();
  }
}
