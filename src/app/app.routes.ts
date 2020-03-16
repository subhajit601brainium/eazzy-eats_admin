import { Routes } from '@angular/router';

import { DashboardComponent } from './dashboard/dashboard.component';
import { MasjidComponent } from './masjid/masjid.component';
import { UserComponent } from './user/user.component';
import { SubscriptionComponent } from './subscription/subscription.component';
import { SettingComponent } from './setting/setting.component';
import { CmsComponent } from './cms/cms.component';
import { LoginComponent } from './login/login.component';

import { ChangepasswordComponent } from './changepassword/changepassword.component';
import { ForgotpasswordComponent } from './forgotpassword/forgotpassword.component';

import { AuthGuard } from './guards/index';


export const rootRouterConfig: Routes = [
  { path: '', redirectTo: 'login', pathMatch: 'full' },
  { path: 'dashboard', component: DashboardComponent, canActivate: [AuthGuard] },
  { path: 'masjid', component: MasjidComponent, canActivate: [AuthGuard] },
  { path: 'user', component: UserComponent, canActivate: [AuthGuard] },
  { path: 'subscription', component: SubscriptionComponent, canActivate: [AuthGuard] },
  { path: 'setting', component: SettingComponent, canActivate: [AuthGuard] },
  { path: 'cms', component: CmsComponent, canActivate: [AuthGuard] },
  { path: 'login', component: LoginComponent },
  { path: 'Changepassword', component: ChangepasswordComponent, canActivate: [AuthGuard] },
  { path: 'forgotpassword/:id', component: ForgotpasswordComponent }
];
