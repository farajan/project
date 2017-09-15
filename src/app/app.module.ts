import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { AngularFontAwesomeModule } from 'angular-font-awesome/angular-font-awesome';
import { AngularFireModule } from 'angularfire2';
import { AngularFireAuthModule, AUTH_PROVIDERS } from 'angularfire2/auth';
import { AngularFireDatabase, FirebaseListObservable, AngularFireDatabaseModule } from 'angularfire2/database';
import { FormsModule, ReactiveFormsModule }   from '@angular/forms';

import { router } from './app.router';
import { firebaseConfig } from '../environments/firebase.config';

import { AppComponent } from './app.component';
import { LoginComponent } from './component/login/login.component';
import { SliderComponent } from './component/slider/slider.component';
import { Service } from './service/service';
import { WelcomeComponent } from './component/welcome/welcome.component';
import { FooterComponent } from './component/footer/footer.component';
import { NavbarComponent } from './component/navbar/navbar.component';
import { ListsComponent } from './component/lists/lists.component';
import { CardComponent } from './component/card/card.component';
import { GroupsComponent } from './component/groups/groups.component';
import { FriendsComponent } from './component/friends/friends.component';
import { AddlistComponent } from './component/addlist/addlist.component';
import { ListComponent } from './component/list/list.component';
import { ListmenuComponent } from './component/listmenu/listmenu.component';
import { RegistrationComponent } from './component/registration/registration.component';
import { SearchFriendComponent } from './component/search-friend/search-friend.component';
import { AddgroupComponent } from './component/addgroup/addgroup.component';
import { GroupComponent } from './component/group/group.component';
import { GroupmenuComponent } from './component/groupmenu/groupmenu.component';



@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    SliderComponent,
    WelcomeComponent,
    FooterComponent,
    NavbarComponent,
    ListsComponent,
    CardComponent,
    GroupsComponent,
    FriendsComponent,
    AddlistComponent,
    ListComponent,
    ListmenuComponent,
    RegistrationComponent,
    SearchFriendComponent,
    AddgroupComponent,
    GroupComponent,
    GroupmenuComponent
  ],
  imports: [
    router,
    BrowserModule,
    NgbModule.forRoot(),
    AngularFontAwesomeModule,
    AngularFireModule.initializeApp(firebaseConfig),
    AngularFireAuthModule,
    AngularFireDatabaseModule,
    FormsModule,
    ReactiveFormsModule
  ],
  providers: [Service],
  bootstrap: [AppComponent]
})
export class AppModule { }
