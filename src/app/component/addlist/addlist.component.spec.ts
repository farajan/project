import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AddlistComponent } from './addlist.component';
import { AngularFireDatabase } from 'angularfire2/database';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';



describe('AddlistComponent', () => {
    let db: AngularFireDatabase;
  let component: AddlistComponent;
  let fixture: ComponentFixture<AddlistComponent>;

  // beforeEach(async(() => {
  //   TestBed.configureTestingModule({
  //     declarations: [ AddlistComponent ],
  //     imports: [
  //       NgbModule.forRoot()
  //     ]
  //   })
  //   .compileComponents();
  // }));

  // beforeEach(() => {
  //   fixture = TestBed.createComponent(AddlistComponent);
  //   component = fixture.componentInstance;
  //   fixture.detectChanges();
  // });

  it('addList(name: string, note?: string)', () => {
        
  });
});
