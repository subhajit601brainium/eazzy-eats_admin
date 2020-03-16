
 import { Router } from '@angular/router';

import { UserService } from '../userservice/user.service';
import { MessageService } from '../userservice/message.services';
import { Http } from "@angular/http";
import { Component,Input, OnInit,EventEmitter, Output,Injectable,ViewChild } from '@angular/core';
import {Broadcaster} from '../broadcaster';
import {Observable} from 'rxjs/Rx'

export class LoginData {
    user: string;
    password: string;
}

export class forgotpassAdmin {
    email: string;
}

@Component({
    styleUrls: ['./login.component.css'],
    templateUrl: './login.component.html'
})
export class LoginComponent implements OnInit {
    //returnUrl: string;
   @Input() title:string;

  @Output() notify: EventEmitter<string> = new EventEmitter<string>();
  @ViewChild('closebutton') closebutton;

    loginData: LoginData;
    forgotpassadmin: forgotpassAdmin
    valiemail = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

    constructor(private http: Http,
        private _appservice: UserService,
        private _message: MessageService,
        private _router: Router,
        private broadcaster: Broadcaster
     ) {
    }
    ngOnInit(): void {
        var tokenchk = localStorage.getItem("admintoken");   
        if (tokenchk != null) {      
            this._router.navigate(['/dashboard']);
          } else {
        }
        this.loginData = {
            user: '',
            password: ''
        };
        this.forgotpassadmin = {
            email: ''
        };
    }

    doLogin() {
        console.log(this.loginData);
        // return;
        if (this.loginData.user.trim() == '' || !this.valiemail.test(this.loginData.user)) {
            var errorMessage = 'Invalid email';
            this._message.showError(errorMessage);
            return false;
        }
        else if (this.loginData.password == '') {
            var errorMessage = 'Invalid password';
            this._message.showError(errorMessage);
        }
        else if (this.loginData.password.length < 6) {
            var errorMessage = 'Invalid password';
            this._message.showError(errorMessage);
        }
        else {
            var loginData = this.loginData;
            loginData['userType'] = 'admin';
            loginData['loginType'] = 'EMAIL';
           // console.log(loginData);
            this._appservice.doLogin(loginData)
                .subscribe((Response) => {
                    console.log(Response);
                    if (Response.success) {
                        this._message.showSuccess(Response.message);
                        localStorage.setItem('adminemail', Response.response_data.userDetails.email);
                        localStorage.setItem('adminId', Response.response_data.userDetails.id);
                        localStorage.setItem('admintoken', Response.response_data.authToken);
                        this._router.navigate(['/dashboard']);
                        location.reload();
                     } else {
                        this._message.showError(Response.message)
                    }
                }, (Error) => {
                    this._message.showError(Error.message)
                })
        }
    }
    forgotpassLinksend() {
        if (this.forgotpassadmin.email.trim() == '' || !this.valiemail.test(this.forgotpassadmin.email)) {
            var errorMessage = 'Please provide registered email address ';
            this._message.showError(errorMessage);
        } else {
            var forgotpassadmin = this.forgotpassadmin;
            forgotpassadmin['userType'] = 'admin';
            this._appservice.forgotpassLinksend(this.forgotpassadmin)
                .subscribe((Response) => {
                   // console.log('Response',Response);
                    if (Response.success) {
                        this.closebutton.nativeElement.click();
                        this.forgotpassadmin.email = '';
                        this._message.showSuccess(Response.message);
                    } else {
                        this._message.showError(Response.message)
                    }
                }, (Error) => {
                    this._message.showError(Error.message)
                })
        }
    }

    onClick(){
    this.notify.emit('Click from nested component');
    }
}
