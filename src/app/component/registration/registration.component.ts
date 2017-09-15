import { ElementData } from '@angular/core/src/view/types';
import { query } from '@angular/core/src/animation/dsl';
import { Component, OnInit } from '@angular/core';
import { NgbModal, ModalDismissReasons, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';
import { AngularFireAuth } from 'angularfire2/auth';
import { AngularFireAuthModule } from 'angularfire2/auth'


import * as firebase from 'firebase/app';
import { User } from '../../model/user';
import { Observable } from 'rxjs/Observable';
import { AngularFireDatabase, AngularFireDatabaseModule, FirebaseListObservable } from 'angularfire2/database';
import { Service } from '../../service/service';
// import { AngularFire } from 'angularfire2';


@Component({
  selector: 'app-registration',
  templateUrl: './registration.component.html',
  styleUrls: ['./registration.component.css']
})
export class RegistrationComponent implements OnInit {
  private modalWindow: NgbModalRef;
  public user: User;
  public users: FirebaseListObservable<any[]>;
  public userAlreadyExist: boolean;

  constructor(
    private modalService: NgbModal,
    private service: Service,
    private db: AngularFireDatabase) {
    // this.users = db.list('/users');
  }

  ngOnInit() {
    this.user = new User();
  }


  open(content) {
    this.modalWindow = this.modalService.open(content);
  }

  public registerUser(login: string) {
    console.log(login);

    firebase.database().ref().child('users');
    this.users = this.db.list('/users', {
      query: {
        orderByChild: 'email',
        equalTo: login
      }
    });
  }

  public addNewUser() {
    const auth = firebase.auth();
    auth.createUserWithEmailAndPassword(this.user.email, this.user.password);
  //   console.log(this.user.email);

  //   this.registerUser(this.user.email);


  //   let dbRef: firebase.database.Reference = firebase.database().ref('users');
  //   dbRef.push({ email: this.user.email, password: this.user.password, uid: '1' })
  //     .then(
  //     resolve => {
  //       console.log(resolve.key);
  //       firebase.database().ref('users/' + resolve.key).update({ uid: resolve.key });
  //     }
  //     );

  //   this.modalWindow.close();
  //   this.user = new User();
  //   this.userAlreadyExist = false;
  //   console.log('user does not alredy exists');
  }
}
