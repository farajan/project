import { async, ComponentFixture, TestBed } from '@angular/core/testing';

// import { AddlistComponent } from './addlist.component';
import { ListService } from './list.service';
import { Service } from './service';
import { User } from '../model/user';
import { List } from '../model/list';


import server from "karma-firebase-server";
import { AngularFireDatabase, FirebaseObjectObservable, FirebaseListObservable } from 'angularfire2/database';



describe('ListService', () => {
    let db: AngularFireDatabase;
    let listService: ListService;
    let list: List;
    let userService: Service;
    // let port;

    beforeEach(() => {

        listService = new ListService(db);
        list = new List('testListName', null, 'test@test.com', 'test');
        userService = new Service(db);
        // server.start(res => {
        //     port = res.text;
        // });
    });

    it('setList()', () => {
        // this.db.initializeApp({
        //     databaseURL: "ws://127.0.1:" + port
        // });
        listService.setList(list);
        expect(list.name).toBe('testListName');
        expect(list.picture).toBe(null);
        expect(list.admin).toBe('test@test.com');
        expect(list.note).toBe('test');
    });

    it('addList()', () => {
        // let listService = new ListService(db);
        // let list = new List('testListName', null, 'test@test.com', 'test');
        // listService.setList(list);
        let userService = new Service(db);
        // listService.addList('testListName', userService);
        this.db.list('/lists').push(this.list);
    });

    // it('renameList(newName: string, idList: string)', () => {
    //     // let listService = new ListService(db);
    //     // let list = new List('testListName', null, 'test@test.com', 'test');
    //     // listService.renameList(list);
    //     // let userService = new Service(db);
    //     // listService.addList('testListName', userService);
    // });


    afterAll( () => {
        // server.close(port, function () { });
    });

});