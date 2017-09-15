import { RouterModule, Routes } from '@angular/router';
import { ModuleWithProviders } from '@angular/core';

import { LoginComponent } from './component/login/login.component';
import { ListsComponent } from './component/lists/lists.component';
import { ListComponent } from './component/list/list.component';
import { GroupsComponent } from './component/groups/groups.component';
import { FriendsComponent } from './component/friends/friends.component';
import { RegistrationComponent } from './component/registration/registration.component';
import { GroupComponent } from './component/group/group.component';

export const routes: Routes = [
    //  { path: '', redirectTo: 'reg', pathMatch: 'full' },
     { path: 'login', component: LoginComponent },
     { path: 'lists', component: ListsComponent },
     { path: 'list', component: ListComponent },
     { path: 'groups', component: GroupsComponent },
     { path: 'friends', component: FriendsComponent },
     { path: 'group', component: GroupComponent}
    //  { path: 'reg', component: RegistrationComponent }
    // { path: 'home', component: HomeComponent }
];

export const router: ModuleWithProviders = RouterModule.forRoot(routes);