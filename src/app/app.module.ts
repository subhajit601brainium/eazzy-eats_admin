import { NgModule, ViewContainerRef } from '@angular/core'
import { RouterModule } from '@angular/router';
import { rootRouterConfig } from './app.routes';
import { AppComponent } from './app.component';
import { UserService } from './userservice/user.service';
import { MessageService } from './userservice/message.services';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';
import { HttpModule } from '@angular/http';
import { Broadcaster } from './broadcaster';
import { HighlightPipe } from './highlight.pipe';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MomentModule } from 'angular2-moment';

import { DashboardComponent } from './dashboard/dashboard.component';
import { MasjidComponent } from './masjid/masjid.component';
import { UserComponent } from './user/user.component';
import { SubscriptionComponent } from './subscription/subscription.component';
import { CmsComponent } from './cms/cms.component';
import { SettingComponent } from './setting/setting.component';
import { LoginComponent } from './login/login.component';

import { ToastrModule } from 'ngx-toastr';
import { NgDatepickerModule } from 'ng2-datepicker';
import { Ng2DatetimePickerModule } from 'ng2-datetime-picker';
import { BsDatepickerModule } from 'ngx-bootstrap/datepicker';

import { ChangepasswordComponent } from './changepassword/changepassword.component';
import { ForgotpasswordComponent } from './forgotpassword/forgotpassword.component';

import { CategoryComponent } from './category/category.component';
import { VendorComponent } from './vendor/vendor.component';

import { AuthGuard } from './guards/index';

//import { ToastrModule } from 'ngx-toastr';
import { CKEditorModule } from 'ng2-ckeditor';
import { VendoritemsComponent } from './vendoritems/vendoritems.component';
//import { CKEditorModule } from '@ckeditor/ckeditor5-angular';



@NgModule({
  declarations: [
    AppComponent,
    HighlightPipe,
    DashboardComponent,
    MasjidComponent,
    CategoryComponent,
    VendorComponent,
    UserComponent,
    SubscriptionComponent,
    SettingComponent,
    CmsComponent,
    LoginComponent,
    ChangepasswordComponent,
    ForgotpasswordComponent,
    VendoritemsComponent
  ],
  imports: [
    BrowserModule, ToastrModule.forRoot(),
    FormsModule,
    ReactiveFormsModule, BrowserAnimationsModule,
    HttpModule,
    CKEditorModule,
    NgDatepickerModule,
    Ng2DatetimePickerModule,
    BsDatepickerModule.forRoot(),
    MomentModule,
    RouterModule.forRoot(rootRouterConfig, { useHash: true })
  ],

  providers: [

    Broadcaster,
    UserService, MessageService,
    AuthGuard
  ],
  bootstrap: [AppComponent]
})

export class AppModule {

}
