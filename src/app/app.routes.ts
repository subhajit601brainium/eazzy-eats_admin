import { Routes } from '@angular/router';

import { DashboardComponent } from './dashboard/dashboard.component';
import { CategoryComponent } from './category/category.component';
import { VendorComponent } from './vendor/vendor.component';
import { VendoritemsComponent } from './vendoritems/vendoritems.component';
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
  { path: 'categoryAdd', component: CategoryComponent, canActivate: [AuthGuard] },
  { path: 'vendorAdd', component: VendorComponent, canActivate: [AuthGuard] },
  { path: 'itemAdd/:vendorId', component: VendoritemsComponent, canActivate: [AuthGuard] },
  { path: 'user', component: UserComponent, canActivate: [AuthGuard] },
  { path: 'login', component: LoginComponent },
  { path: 'Changepassword', component: ChangepasswordComponent, canActivate: [AuthGuard] },
  { path: 'forgotpassword/:id', component: ForgotpasswordComponent }
];
